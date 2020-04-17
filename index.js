addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with variant dialog
 * @param {Request} request
 */
async function handleRequest(request) {
  const fetchUrl = 'https://cfw-takehome.developers.workers.dev/api/variants'
  const init = {
    headers: {
      'content-type': 'application/json',
    },
  }

  const result = await fetch(fetchUrl, init).then((response) => {
      return response.json()
    }).then((data) => {
      return data['variants']
    })
    
  const cookie = request.headers.get('cookie')
  let url_pos = 0
  let const_set = false
  if (cookie && cookie.includes('variant=0')) {
    url_pos = 0
    cookie_set = true
  } else if (cookie && cookie.includes('variant=1')){
    url_pos = 1
    cookie_set = true
  } else {
    url_pos = Math.floor(Math.random() * 2)
    cookie_set = false
  }

  const updated_response = await fetch(result[url_pos], init).then((response) => {
    return new HTMLRewriter().on('*', new ElementHandler(url_pos)).transform(response)
  })
  // setting the cookie expiration, so that user privacy is maintained
  max_age = 24*60*60
  if (cookie_set == false) {
    updated_response.headers.append('set-cookie',`variant=${url_pos};path=/;max-age=${max_age}`)
  }
  return updated_response
}

class ElementHandler {
  constructor(option) {
    this.option = option
    this.titles = ['Cloudflare_1','Cloudflare_2']
    this.headings = ['Ciao','Hola']
    this.paragraphs = ['Hi there!','Hey there!']
    this.navigate = ['Show me the code :)','Navigate to the code :)']
    this.navigateUrl = 'https://github.com/mkartik/cloudflare_workers'
  }
  element(element) {
    if (element.tagName == 'title') {
      element.setInnerContent(this.titles[this.option])
    }
    else if (element.tagName == 'h1') {
      element.setInnerContent(this.headings[this.option])
    }
    else if (element.tagName == 'p') {
      element.setInnerContent(this.paragraphs[this.option])
    }
    else if (element.tagName == 'a') {
      element.setAttribute('href',this.navigateUrl)
      element.setInnerContent(this.navigate[this.option])
    }
  }
}


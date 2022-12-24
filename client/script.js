import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval;

// To show loading state while AI is fetching response
const loader = (element) => {
  element.textContent = ''
  loadInterval = setInterval(() => {
    element.textContent += '.'
    if(element.textContent.length === '....') {
      element.textContent = ''
    }
  }, 3000)
}

const typeText =(element, text) => {
  let index = 0

  let interval = setInterval(() => {
    if(index < text.length) {
      element.textContent += text.charAt(index)
      index++
    }else{
      clearInterval(interval)
    }
  }, 20)
}

const generateUniqueId = () => {
  const timestamp = Date.now()
  const randomNumber = Math.random()
  const hexadeximalString = randomNumber.toString(16)
  return `id-${timestamp}-${hexadeximalString}`
}

const chatStripe = (isAi, value, uniqueId) => {
  return(
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div class="profile">
            <img src="${isAi ? bot : user}" alt="${isAi ? 'bot' : 'user'}" />
          </div>
          <div class="message" id=${uniqueId}>
            <p>${value}</p>
          </div>
        </div>
      </div>
    `
  )
}

const handleSubmit = async(e) => {
  e.preventDefault()
  const data = new FormData(form)

  // Generate the user's chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'))
  form.reset()

  // Generate the AI's chat stripe
  const uniqueId = generateUniqueId()
  chatContainer.innerHTML += chatStripe(true, ' ', uniqueId)

  chatContainer.scrollTop = chatContainer.scrollHeight

  const messageDiv = document.getElementById(uniqueId)

  loader(messageDiv)
}
form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13) handleSubmit(e)
})
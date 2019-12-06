console.log('Client side script is loaded.')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (search.value.length === 0) {
        msg2.textContent ='Please provide a valid address'
        msg1.textContent = ''
    } else {
        msg1.textContent = 'Loading ...'
        msg2.textContent = ''
        const url =  '/weather?address=' + search.value
        fetch(url).then((response) => {
            response.json().then((data) => {

                if (data.error) {
                    msg2.textContent = data.error
                    msg1.textContent = ''
                } else {
                    msg2.textContent = data.weather
                    msg1.textContent = data.location
                }
            })
        })
    }
})
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', (e) => {
    const id = card.getAttribute('id')
    window.location.href = `/recipes/${id}`
  })
})

document.querySelectorAll('.button-hidden').forEach(hidden => {
  hidden.addEventListener('click', (e) => {
    const value = hidden.innerHTML

    hidden.innerHTML = value === 'MOSTRAR' ? 'ESCONDER' : 'MOSTRAR'
    
    const parentHidden = hidden.parentNode.parentNode
    parentHidden.querySelector('.recipe__hidden').classList.toggle('hidden-element')
  })
})
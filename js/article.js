async function getData (){
    let data = await fetch('https://jsonplaceholder.typicode.com/posts')
    .then(Response => Response.json())

    data.map(rep =>{
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${rep.id}</td>
        <td>${rep.userId}</td>
        <td>${rep.title}</td>
        <td>${rep.body}</td>
        <td><a href="/article/editer/${rep.id}" onclick="editer(event)"> Editer</a></td>
        <td><a href="https://jsonplaceholder.typicode.com/posts/${rep.id}" onclick="supprimer(event)"> Supprimer</a></td>

        `
        document.querySelector('#tb-article tbody').prepend(tr)
    })
}
async function creer(event){
    event.preventDefault()
    const form = document.querySelector('#createForm')
    let donnee = {
        userId : form.userId.value,
        title : form.title.value,
        body :form.body.value

    }
    let rep = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(donnee),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())

        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${rep.id}</td>
        <td>${rep.userId}</td>
        <td>${rep.title}</td>
        <td>${rep.body}</td>
        <td><a href="/article/editer/${rep.id}" onclick="editer(event)"> Editer</a></td>
        <td><a href="https://jsonplaceholder.typicode.com/posts/${rep.id}" onclick="supprimer(event)"> Supprimer</a></td>

        `
        document.querySelector('#tb-article tbody').prepend(tr)
        form.reset()
        
}
async function supprimer(event){
    event.preventDefault()
    if(confirm('Voulez vous effectuer cette suppression?')){
        const link = event.target.getAttribute('href')
        const tr = event.target.closest('tr')
        await fetch(link, { 

            method: 'DELETE',
        });
        tr.remove()
    }
    
    
}
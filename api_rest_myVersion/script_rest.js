const API = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=fc6cc2de-39c1-4cde-8fb5-f6aab937ea6f';
const API_favs = 'https://api.thedogapi.com/v1/favourites?api_key=fc6cc2de-39c1-4cde-8fb5-f6aab937ea6f'
const API_delete = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=fc6cc2de-39c1-4cde-8fb5-f6aab937ea6f`
const API_upload = 'https://api.thedogapi.com/v1/images/upload'

/*fetch(API)
  .then(response => response.json())
  .then(data => {
      data[0].breeds
    console.log(data)
  })
  
  .catch(err => {(console.error(new err))});*/

  //******** PRIMERA PARTE: NADA QUE CAMBIAR ************//

  document.getElementById("refreshButton").onclick = function() {cambioConfirmation(); 
    getDogs()
  };

   function cambioConfirmation(){
       document.getElementById("elCambio").innerHTML = "SI ya hizo click";
   }

    //******** SEGUNDA PARTE: ASYNC AWAIT ************//

const spanError = document.getElementById("error")

  async function getDogs(){

    let res = await fetch(API) ;
    let rtaJson = await res.json();

    if(res.status !== 200){ spanError.innerHTML= 'Ups, hay un error ' + res.status + rtaJson.message 

    } else{
        const perro1 = document.getElementById('fotoPerros__1')
        const perro2 = document.getElementById('fotoPerros__2')
        const perro3 = document.getElementById('fotoPerros__3')

        const btn1 = document.getElementById('fotoPerros_btn1')
        const btn2 = document.getElementById('fotoPerros_btn2')
        const btn3 = document.getElementById('fotoPerros_btn3')
    
         perro1.src = rtaJson[0].url
         perro2.src = rtaJson[1].url
         perro3.src = rtaJson[2].url

         btn1.onclick = () => saveDogs(rtaJson[0].id)
         btn2.onclick = () => saveDogs(rtaJson[1].id)
         btn3.onclick = () => saveDogs(rtaJson[2].id)
    }
  }

async function spaceSavedDogs(){
    let res = await fetch(API_favs) ;
    let rtaJson = await res.json();

    console.log("This is favourite res: " , res)
    console.log("This is favourite rtaJson: " , rtaJson)

    document.getElementById('perroFavorito').innerHTML = "";

    if(res.status !== 200){ spanError.innerHTML= 'Ups, hay un error ' + res.status + rtaJson.message 
    } else{

        rtaJson.forEach(element => {
            // console.log("este es element:")
            // console.log(element)
            const section = document.getElementById('perroFavorito')
            const article = document.createElement('article')
            const img = document.createElement('img')
            const button = document.createElement('button')
            const textButton = document.createTextNode('Borrar Perro')
            
            button.appendChild(textButton)
            article.appendChild(img)
            article.appendChild(button)
            section.appendChild(article)

            
            img.src = element.image.url
            img.width = 150;

            button.onclick = () => deleteDogs(rtaJson[0].id)
            console.log("This is rta.id ", rtaJson[0].id)

        });
  }
  }

async function saveDogs(id){
  let res = await fetch(API_favs, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          image_id: id, 
        }), 
      }) ;
      let rtaJson = await res.json();
    
      console.log("this is end rtaJSON: ", rtaJson)
      console.log(rtaJson)
      if(res.status !== 200){ spanError.innerHTML= 'Ups, hay un error ' + res.status + rtaJson.message 
      }
      else{
        spaceSavedDogs()
      }
  }

  async function deleteDogs(id){
    let res = await fetch(API_delete(id), {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
    })
    let rtaJson = await res.json()

    console.log("THis is res delete: ", res)
    console.log(rtaJson)

      if(res.status !== 200){ spanError.innerHTML= 'Ups, hay un error ' + res.status + rtaJson.message 
      } else {
        spaceSavedDogs()
      }

  }

  async function subirFotoPerro(){
    const form = document.getElementById("formularioSubida__id")
    const formData = new FormData(form)

    console.log("Form Data: ", formData.get('fotoPerro'))
    //console.log("Form: ", form)

    let res = await fetch(API_upload, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'X-API-KEY': 'fc6cc2de-39c1-4cde-8fb5-f6aab937ea6f',
      },
      body: formData,
    })

    let rtaJson = await res.json()
    if(res.status !== 200){ spanError.innerHTML= 'Ups, hay un error ' + res.status + rtaJson.message 
  }
    console.log("EL ERROR: ", rtaJson )
  }
  
getDogs();
spaceSavedDogs();
    
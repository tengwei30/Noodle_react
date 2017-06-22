
export default function Request(url,body,callback){
  fetch(url,{
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((res) => res.json()).then((res) => {
    callback(res)
  }).catch((err) => {
    console.log(err)
  })
}




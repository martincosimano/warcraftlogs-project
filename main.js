document.querySelector('button').addEventListener('click', getFetch)
let totalScore = 0

function getFetch(){
  const characterName = document.querySelector('#nameInput').value.toLowerCase()
  const realmName = document.querySelector('#realmInput').value.toLowerCase()
  let role = document.querySelector('#roleInput').value
  role = role.replace(/^./, role[0].toUpperCase())
  const raidSize = document.querySelector('#raidSizeInput').value

  const url = ` https://classic.warcraftlogs.com:443/v1/rankings/character/${characterName}/${realmName}/us?api_key=94202797bf3c372e7d0f0dbc0b70996e`

  fetch(url)
.then(res => res.json()) // parse response as JSON
.then(data => {
  for(let i = 0;i <= data.length - 1;i++){
    if(data[i].size === Number(raidSize) && data[i].spec === role.toString() && data[i].encounterName !=="Gothik the Harvester"){
      console.log(data[i].encounterName,Math.ceil(data[i].percentile))
      totalScore += (Math.ceil(data[i].percentile) / 16)
    }
  }
  console.log(`${characterName.replace(/^./, characterName[0].toUpperCase())} score is ${Math.round(totalScore)}`)
})
.catch(err => {
    console.log(`error ${err}`)
})
}
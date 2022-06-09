const fromSelect = document.querySelector(".from-select")
const toSelect = document.querySelector(".to-select")
const fromText = document.querySelector(".from-text")
const toText = document.querySelector(".to-text")
const exchangeIcon = document.querySelector(".exchange")
const controlsContainer = document.querySelector(".controls")
const isCopyTo = document.querySelector(".isCopyTo")
const isCopyFrom = document.querySelector(".isCopyFrom")



const translateBtn = document.querySelector("button")

const selectOptsTo = []
const selectOptsFrom = []



for(countryCode in countries){
    let selected;
    let selectedTo;
    

    if(countryCode == "es-ES"){
        selectedTo = "selected"
    }
    
    let optionFrom = `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`
    selectOptsFrom.push(optionFrom)

    let optionTo = `<option value="${countryCode}" ${selectedTo}>${countries[countryCode]}</option>`
    selectOptsTo.push(optionTo)

}



toSelect.insertAdjacentHTML("beforeend", selectOptsTo)
fromSelect.insertAdjacentHTML("beforeend", selectOptsFrom)


exchangeIcon.addEventListener("click",()=>{
    let tempText = fromText.value;
    let tempLang = fromSelect.value

    fromText.value = toText.value
    toText.value = tempText

    fromSelect.value = toSelect.value;
    toSelect.value = tempLang
})

translateBtn.addEventListener("click",()=>{
    let text = fromText.value
    let translateFrom = fromSelect.value
    let translateTo = toSelect.value 

    const apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    fetch(apiUrl).then(res=>res.json()).then(data => {
    toText.value = data.responseData.translatedText
    })
})


controlsContainer.addEventListener('click',({target})=>{
let utterance;


    if(target.classList.contains("copyFrom")){
        navigator.clipboard.writeText(fromText.value)
        isCopyFrom.classList.add("active")
        setTimeout(()=>{
        isCopyFrom.classList.remove("active")

        },700)
    }
    if(target.classList.contains("copyTo")){
        navigator.clipboard.writeText(toText.value)
        isCopyTo.classList.add("active")
        setTimeout(()=>{
        isCopyTo.classList.remove("active")

        },700)
    }

    if(target.classList.contains("fromSpeech")){
        utterance = new SpeechSynthesisUtterance(fromText.value)
        utterance.lang = fromSelect.value
        speechSynthesis.speak(utterance)
    }
    if(target.classList.contains("toSpeech")){
        utterance = new SpeechSynthesisUtterance(toText.value)
        utterance.lang = toSelect.value
        speechSynthesis.speak(utterance)

    }
})
// Get Section From The Page :
let section = document.querySelector('section')

// Get Start Button From The Page :
let Levels = document.querySelectorAll('.Levels div')

// Get Word From The Page :
let Word = document.querySelector('.word')

// Get Start Button From The Page :
let StartButton = document.querySelector('button')

// Get Input From Form :
let Input = document.querySelector('.form input')

// Get Input From Form :
let WordsContainer = document.querySelector('.words')

// Get TimeSpan From The Page :
let TimeSpan = document.querySelector('.time span')

// Get ScoreSpan From The Page :
let ScoreSpan = document.querySelector('.score .Score')

// Get WordsTotal From The Page :
let WordsTotal = document.querySelector('.score .total')

// The WordsLists (Easy, Normal, Hard) :
let HardWords = ['programming','documentation','destructuring','javascript','dependencies','optimization','performance','accessibility','notifications','wallpaper']
let NormalWords = ['country','testing','hello','python','lion', 'tiger', 'elephant', 'giraffe', 'dog','coding','working','runner','playing','internet', 'linkedin', 'twitter', 'github', 'leetcode', 'cascade', 'kingdom']
let EasyWords = ['top', 'king', 'man','down','up', 'deer', 'cat', 'fox', 'php', 'css', 'html' ]

// WordsList Container List :
let ContainerLists = [EasyWords, NormalWords, HardWords]

// IndexesList To Get The Level :
let IndexesList = [3, 4, 5];

// Add Active Class To Level In Levels :
Levels[1].classList.add('active')

// Get Index Of Level Who Has Active Class :
let index = 0;

Levels.forEach((x, i) => {
    x.classList.contains('active') ? index = i : ''

    // Change TextContent Of TimeSpan :
    TimeSpan.textContent = IndexesList[index] + 3

    // CurrentWordsList :
    CurrentWordsList = ContainerLists[index];
    

    // Change TextContent Of WordsTotal :
    WordsTotal.textContent = CurrentWordsList.length

    // Get Random Word From CurrentWordsList :
    WordRandom = CurrentWordsList[Math.floor(Math.random() * CurrentWordsList.length)]
    
    x.onclick = function () {
        index = i;

        TimeSpan.textContent = IndexesList[index] + 3

        // CurrentWordsList :
        CurrentWordsList = ContainerLists[index];

        // Change TextContent Of WordsTotal :
        WordsTotal.textContent = CurrentWordsList.length

        Levels.forEach( x => x.classList.remove('active'))

        // Add Active Class To Level Clicked :
        x.classList.add('active')

        // Get Random Word From CurrentWordsList :
        WordRandom = CurrentWordsList[Math.floor(Math.random() * CurrentWordsList.length)]
    }
});

// Add Disabled Class And Prevent Paste On Input:
Input.classList.add('disabled')
Input.onpaste = function () { return false};

// Give The Button A click Event :
StartButton.onclick = function () {
    Levels.forEach( x => x.classList.add('disabled'))

    // Remove Disabled Class :
    Input.classList.remove('disabled')

    // Remove The Button :
    StartButton.remove()

    // The Strong Control On Input :
    document.addEventListener('click', () => Input.focus())

    // Display Word Div In Page :
    Word.classList.add('show')

    // Add WordRandom To Word :
    Word.appendChild(document.createTextNode(WordRandom))

    // Input Focusing :
    Input.focus()

    // Append WordsSpans To WordsContainer :
    AddWordSpanToWordContainer(CurrentWordsList)

    // On Input Typing :
    OnInputTyping()

    // Counter Down :
    CountDown()
}

function AddWordSpanToWordContainer(CurrentWordsList) {
    // Remove All Exist In WordsContainer :
    WordsContainer.innerHTML = ''
    
    CurrentWordsList.forEach((x) => {

        // Create Span Element :
        let span = document.createElement('span')

        // Add TextNode To Span :
        span.appendChild(document.createTextNode(x))

        // Add Span To HisFather :
        x !== WordRandom ? WordsContainer.appendChild(span) : ''
    })
}

function OnInputTyping() {
    Input.oninput = function () {
        if (Input.value.toLowerCase() === WordRandom) {
            // Remove WordRandom From CurrentWordsList :
            CurrentWordsList[CurrentWordsList.indexOf(WordRandom)] = ''

            // CurrentWordsList :
            let NewCurrentWordsList = CurrentWordsList.filter( x => x !== '');

            // Get Random Word From CurrentWordsList :
            WordRandom = NewCurrentWordsList[Math.floor(Math.random() * NewCurrentWordsList.length)]
            
            // Change TextContent Of Word :
            Word.textContent = WordRandom

            // Remove Input Value :
            Input.value = ''

            // Remove WordRandom From WordsContainer :
            AddWordSpanToWordContainer(NewCurrentWordsList)

            // Change TextContent Of TimeSpan :
            TimeSpan.textContent = IndexesList[index];

            // Audio Playing :
            document.querySelector('#success').play()

            // Change ScoreSpan :
            ScoreSpan.textContent++

            // Check If NewCurrentWordsList Is Empty :
            NewCurrentWordsList.length !== 0 ? '' : EndGame()
        }
    }
}

function CountDown() {
    let CountDown = setInterval(function () {
        if (TimeSpan.textContent != 0 ) {
            TimeSpan.textContent--
        } else {
            clearInterval(CountDown)
            Input.classList.add('disabled')
            Input.blur()
            ScoreSpan.textContent != CurrentWordsList.length ? GameOver() : ''
        }
    }, 1000)
}

function EndGame() {
    let PopUp = document.createElement('div')
    let button = document.createElement('button')
    let div = document.createElement('div')
    // Add Classes To The Element :
    PopUp.classList.add('pop_up', 's-color')
    button.classList.add('button')
    div.classList.add('div')
    // Append Childs To Element :
    PopUp.appendChild(document.createTextNode('You Win !'))
    div.appendChild(document.createTextNode(`You Did It, The Score Is ${ScoreSpan.textContent}`))
    PopUp.appendChild(div)
    button.appendChild(document.createTextNode('Restart'))
    PopUp.appendChild(button)
    // Append PopUp To Section :
    section.appendChild(PopUp)
    // Command The Button :
    button.onclick = function () {
        location.reload()
    }
    document.querySelector('#success').play()
}
function GameOver() {
    let PopUp = document.createElement('div')
    let button = document.createElement('button')
    let div = document.createElement('div')
    // Add Classes To The Element :
    PopUp.classList.add('pop_up', 'f-color')
    button.classList.add('button')
    div.classList.add('div')
    // Append Childs To Element :
    PopUp.appendChild(document.createTextNode(`Game Over !`))
    div.appendChild(document.createTextNode(`Your Score Was Is ${ScoreSpan.textContent}`))
    PopUp.appendChild(div)
    button.appendChild(document.createTextNode('Restart'))
    PopUp.appendChild(button)
    // Append PopUp To Section :
    section.appendChild(PopUp)
    // Command The Button :
    button.onclick = function () {
        location.reload()
    }
    document.getElementById('gameOver').play();
}






let GameTitle = document.querySelector('.logo')
let TextContent = 'Speed Typing Test Game'.split('')
let i = 0
let time = setInterval(function () {
    TextContent[i] ? GameTitle.textContent += TextContent[i++] : clearInterval(time)
}, 200)
let ColorsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
let Color = '#'
let SwitchInput = document.querySelector('.switch-checkbox')

SwitchInput.onclick = function () {
    if (SwitchInput.checked) {
        Color = '#'
        for (let i = 0 ; i < 6; i++) {
            Color += ColorsList[Math.floor(Math.random() * ColorsList.length)]
        }
        section.style.cssText = `background-color: ${Color}`
    } else {
        section.style.cssText = `background-color: inherit`
    }
}














let TheRequest = new XMLHttpRequest()
TheRequest.open('GET', '/Js/Js.json')
TheRequest.send()
TheRequest.onreadystatechange = function () {
    if (TheRequest.readyState === 4 && TheRequest.status === 200) {
        let Informations = JSON.parse(this.responseText)
        for (let Info in Informations) {
            console.log(Info + ' : ' + JSON.stringify(Informations[Info]))
        }
    }
}
console.log()
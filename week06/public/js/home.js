
function getAllCards() {
    $.get('/cards', (result) => {
        if (result.success) {
            // console.log(result);
            renderCards(result.data);
        }
    })
}

const formSumitted = () => {
    let formData = {};
    formData.weekName = $('#weekName').val();
    formData.description = $('#description').val();
    formData.evaluation = $('#evaluation option:selected').val();

    addCard(formData);
}

function addCard(card) {
    $.ajax({
        url: '/cards',
        type: 'POST',
        data: card,
        success: (result) => {
            if (result.success) {
                location.reload();
            }
        }
    })
}

function fillVal(card) {
    $('#u_id').val(card._id);
    $('#u_weekName').val(card.title);
    $('#u_description').text('');
    $('#u_description').val(card.description);
    let evaluation = card.evaluation.toUpperCase()
    $('#u_evaluation').val(evaluation);
}

function deleteCard(_id) {
    console.log(_id)
    $.ajax({
        url: '/cards/' + _id,
        type: 'delete',
        success: (result) => {
            if (result.success) {
                location.reload();
            }
        }
    })
}

function updateCard() {
    let formData = {};
    formData._id = $('#u_id').val();
    formData.title = $('#u_weekName').val();
    formData.description = $('#u_description').val();
    formData.evaluation = $('#u_evaluation option:selected').val();
    // console.log(formData);

    $.ajax({
        url: '/cards',
        type: 'put',
        data: formData,
        success: (result) => {
            if (result.success) {
                location.reload();
            }
        }
    })
}

$(document).ready(function () {
    M.AutoInit();

    $('#formSubmit').click(() => {
        formSumitted();
    });

    $('#u_formSubmit').click(() => {
        updateCard();
    });

    $('.modal').modal();

    getAllCards();
});

const renderCards = (cards) => {
    let cardsEle = document.getElementById("cards");
    let rowEle = document.createElement('div');
    rowEle.classList.add('row');
    cardsEle.appendChild(rowEle);

    let i = 0;
    cards.forEach(card => {

        if (i % 2 == 0 && i != 0) {
            rowEle = document.createElement('div');
            rowEle.classList.add('row');
            cardsEle.appendChild(rowEle);
            i = 0;
        }
        i++;

        let colEle = document.createElement('div');
        colEle.classList.add('col', 's12', 'm6');
        rowEle.appendChild(colEle);

        let $jsonObj = JSON.stringify(card).replace(/\"/g, "'");
        let cardId = card._id;
        colEle.innerHTML += `
            <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">${card.title}</span>
                        <p>${card.description}</p>
                    </div>
                    <div class="card-action row">
                        <div class="col s4">
                            <a href="#!">${card.evaluation}</a>
                        </div>
                        <div class="col s4">
                            <a class="update-card-btn waves-effect waves-light btn modal-trigger" href="#updateModal" onclick="fillVal(`+ $jsonObj + `)">update</a>
                        </div>
                        <div class="col s4">
                            <a class="btn waves-effect deep-orange"  onclick="deleteCard('`+ cardId + `')">delete</a>
                        </div>
                    </div>
                </div>`
    });


}

let socket = io();

socket.on('message', (msg) => {
    console.log(msg);
    M.toast({ html: 'message: ' + msg });
});






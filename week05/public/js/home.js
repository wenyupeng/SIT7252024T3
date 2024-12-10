
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

    // console.log(formData);
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



$(document).ready(function () {
    $('#formSubmit').click(() => {
        formSumitted();
    });

    $('.modal').modal();

    getAllCards();
});

const renderCards = (cards) => {
    let rowEle = document.createElement('div');
    rowEle.classList.add('row');

    cards.forEach(card => {
        let colEle = document.createElement('div');
        colEle.classList.add('col', 's12', 'm6');
        rowEle.appendChild(colEle);
       
        let jsonObj = JSON.stringify(card);
        colEle.innerHTML += `
            <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">${card.title}</span>
                        <p>${card.description}</p>
                    </div>
                    <div class="card-action">
                        <a href="#">${card.evaluation}</a>
                    </div>
                </div>`
    });
    let cardsEle = document.getElementById("cards");
    cardsEle.appendChild(rowEle);
}





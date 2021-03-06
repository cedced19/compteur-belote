phonon.options({
    navigator: {
        defaultPage: 'home',
        animatePages: true,
        templateRootDirectory: 'views/',
        enableBrowserBackButton: true,
        useHash: true
    }
});

phonon.navigator().on({
    page: 'home',
    content: 'home.html',
    preventClose: false,
    readyDelay: 0
}, function (activity) {

    activity.onCreate(function () {

        var scoreDiv = document.getElementById('score');
        var scoreInput = document.getElementById('score-input');
        var nous = JSON.parse(localStorage.getItem('nous')) || [];
        var vous = JSON.parse(localStorage.getItem('vous')) || [];
        var noGameWarning = document.getElementById('no-game');
        var belote = document.getElementById('belote');
        var beloteForOthers = document.getElementById('belote-for-others');

        function getTotal (list, id) {
            var count = 0;
            for (var k = 0; k < id; k++) {
                count += list[k];
            }
            return count;
        }

        function showScore(id) {
            var mainDiv = document.createElement('div');
            mainDiv.classList.add('row', 'text-center', 'table');

            var idDiv = document.createElement('div');
            idDiv.innerHTML = id;
            idDiv.classList.add('tablet-2', 'large-2', 'phone-2', 'column', 'table-item');
            mainDiv.appendChild(idDiv);

            var nousDiv = document.createElement('div');
            var countNousDiv = document.createElement('div');
            countNousDiv.innerHTML = nous[id-1];
            nousDiv.appendChild(countNousDiv);
            var totalNousDiv = document.createElement('b');
            totalNousDiv.innerHTML = getTotal(nous, id);
            nousDiv.appendChild(totalNousDiv);
            nousDiv.classList.add('tablet-5', 'large-5', 'phone-5', 'column', 'table-item');
            mainDiv.appendChild(nousDiv);

            var vousDiv = document.createElement('div');
            var countVousDiv = document.createElement('div');
            countVousDiv.innerHTML = vous[id-1];
            vousDiv.appendChild(countVousDiv);
            var totalVousDiv = document.createElement('b');
            totalVousDiv.innerHTML = getTotal(vous, id);
            vousDiv.appendChild(totalVousDiv);
            vousDiv.classList.add('tablet-5', 'large-5', 'phone-5', 'column', 'table-item');
            mainDiv.appendChild(vousDiv);

            scoreDiv.appendChild(mainDiv);
            noGameWarning.style.display = 'none';
        }


        for (var i = 0; i < nous.length; i++) {
            showScore(i + 1, nous[i], vous[i])
        }

        document.getElementById('add-nous').on('click', function() {
            var valN = Number(scoreInput.value);
            var valV = 162 - Number(scoreInput.value);
            if (valN>=250) valV = 0;
            if (belote.checked) valN+= 20;
            if (beloteForOthers.checked) valV+= 20;
            nous.push(valN);
            vous.push(valV);
            localStorage.setItem('nous', JSON.stringify(nous));
            localStorage.setItem('vous', JSON.stringify(vous));
            showScore(nous.length);
            scoreInput.value = '';
            belote.checked = false;
            beloteForOthers.checked = false;
        });
        
        document.getElementById('add-vous').on('click', function() {
            var valV = Number(scoreInput.value);
            var valN = 162 - Number(scoreInput.value);
            if (valV>=250) valN = 0;
            if (belote.checked) valV+= 20;
            if (beloteForOthers.checked) valN+= 20;
            nous.push(valN);
            vous.push(valV);
            localStorage.setItem('nous', JSON.stringify(nous));
            localStorage.setItem('vous', JSON.stringify(vous));
            showScore(nous.length);
            scoreInput.value = '';
            belote.checked = false;
            beloteForOthers.checked = false;
        });

        document.getElementById('remove-last').on('click', function() {
            nous.pop();
            vous.pop();
            localStorage.setItem('nous', JSON.stringify(nous));
            localStorage.setItem('vous', JSON.stringify(vous));
            scoreDiv.removeChild(scoreDiv.lastChild);
            if (scoreDiv.childNodes.length == 0) {
                noGameWarning.style.display = 'block';
            }
        });

        document.getElementById('reset').on('click', function() {
            localStorage.setItem('nous', '[]');
            nous = [];
            localStorage.setItem('vous', '[]');
            vous = [];
            while (scoreDiv.firstChild) {
                scoreDiv.removeChild(scoreDiv.firstChild);
            }
            noGameWarning.style.display = 'block';
        });
    });
});

phonon.navigator().start();

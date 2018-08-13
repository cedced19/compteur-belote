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
}, function(activity) {
    var nous = [78, 36, 124, 62];
    var vous = [84, 126, 38, 100];

    activity.onCreate(function() {
        var scoreDiv = document.getElementById('score');

        for (var i = 0; i< nous.length; i++) {
            var mainDiv = document.createElement('div');
            mainDiv.classList.add('row', 'text-center', 'table');

            var idDiv = document.createElement('div');
            idDiv.innerHTML = i+1;
            idDiv.classList.add('tablet-2', 'large-2', 'phone-2', 'column', 'table-item');
            mainDiv.appendChild(idDiv);

            var nousDiv = document.createElement('div');
            nousDiv.innerHTML = nous[i];
            nousDiv.classList.add('tablet-5', 'large-5', 'phone-5', 'column', 'table-item');
            mainDiv.appendChild(nousDiv);

            var vousDiv = document.createElement('div');
            vousDiv.innerHTML = vous[i];
            vousDiv.classList.add('tablet-5', 'large-5', 'phone-5', 'column', 'table-item');
            mainDiv.appendChild(vousDiv);

            scoreDiv.appendChild(mainDiv);
        }

    });
});

phonon.navigator().start();

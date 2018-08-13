phonon.options({
    navigator: {
        defaultPage: 'home',
        animatePages: true,
        enableBrowserBackButton: true
    },
    i18n: null 
});


var app = phonon.navigator();

app.on({page: 'home', preventClose: false, content: null}, function(activity) {

    activity.onCreate(function() {
        document.querySelector('.order').on('tap', onAction);
        document.querySelector('.cancel').on('tap', onAction);
    });

});

app.start();
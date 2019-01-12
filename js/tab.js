$(function() {

    var html = ''
        // 

    function initGallery(el) {


        var imgLength = el.length;

        for (var i = 0; i < imgLength; i++) {
            el.eq(i).attr("data-index", i);
            html += initSrcArr(el.eq(i).children().attr("src"));
            // console.log(html);
        }

        return html;
    };


    function initSrcArr(arr) {
        return '<div class="swiper-slide"><div class="swiper-img"><img src="' + arr + '" alt=""></div></div>';
    };



    var mySwiper2 = new Swiper('#swiper-container2', {
        // pagination: '#swiper-container2',
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        slidesPerView: 4,
        observer: true,
        observeParents: true,
        on: {
            slideChangeTransitionStart: function() {
                $('.swiper-gallery').append(initGallery($(".swiper-slide-active li div")));
                updateNavPosition();
            },
            tap: function() {
                mySwiper3.slideTo(mySwiper2.clickedIndex);
                $('.swiper-gallery').html('');
                html = '';
                $('.swiper-gallery').append(initGallery($(".swiper-slide-active li div")));
            }
        }
    })
    var mySwiper3 = new Swiper('#swiper-container3', {
        observer: true,
        observeParents: true,
        nested: true,

        autoHeight: true,
        on: {
            slideChangeTransitionStart: function() {
                updateNavPosition()
            },

            slideChangeTransitionEnd: function() {
                console.log(111);
                $('.swiper-gallery').html('');
                html = '';
                $('.swiper-gallery').append(initGallery($(".swiper-slide-active li div")));
            },

        }

    })
    updateNavPosition()

    function updateNavPosition() {
        $('#swiper-container2 .active-nav').removeClass('active-nav')
            // console.log($('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex).children());
        var activeNav = $('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex).children().addClass('active-nav');


        if (!activeNav.hasClass('swiper-slide-visible')) {
            // console.log(1);
            if (activeNav.index() > mySwiper2.activeIndex) {
                // console.log(2);
                var thumbsPerNav = Math.floor(mySwiper2.width / activeNav.width()) - 1
                mySwiper2.slideTo(activeNav.index() - thumbsPerNav)
            } else {
                // console.log(3);
                mySwiper2.slideTo(activeNav.index())
            }
        }
    }

})
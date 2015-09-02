<!doctype html>
<html class="no-js" lang="" ng-app="nri">
    <head>
        <?php if(strpos($_SERVER['HTTP_HOST'],"localhost")!==FALSE){ ?>
            <base href="/nri/dist/">
        <?php }else{ ?>
            <base href="/">
        <?php } ?>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link href='http://fonts.googleapis.com/css?family=Raleway:400,700,300' rel='stylesheet' type='text/css'>
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <!-- Place favicon.ico in the root directory -->

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
    </head>
    <body>
    <!--[if lt IE 8]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <div id="main-overlay">
        <span class="spinner" us-spinner="{radius:40, width:10, length: 1, color: '#0076a3', trail:90, hwaccel: true, corners:0.5}" spinner-key="spinner-main">
            <img src="img/logo.png" style="height: 50px;position: absolute;left:50%;top:50%;margin: -25px 0 0 -25px;"/>
        </span>
    </div>
    <div class="header mobile-header">
        <div class="container">
            <div class="col-sm-12">
                <div class="top_logo">
                    <img src="img/logo.png" class=""/>
                </div>
                <div class="top_sub_logo">
                    <img src="img/nri.png" class=""/>
                </div>
            </div>
        </div>
    </div>

    <div id="detail-overlay" class="main-view"></div>

    <div class="site-hide"></div> 
    <div class="site">
        <div class="upper-page">
            <div class="tr-lock"><img src="img/tr_lock.png"/></div>
            <header class="header start">
                <div class="container-fluid">
                    <nav class="col-sm-12">
                        <div class="head-cell">
                            <div class="top_logo">
                                <img src="img/logo.png" class=""/>
                            </div>
                            <div class="top_sub_logo">
                                <img src="img/nri.png" class=""/>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            <div ng-view class="main-view" id="main"></div>
            <div class="main-view" id="main-alt"></div>
        </div>

        <footer class="container-fluid main-footer">
            <div class="bl-lock"><img src="img/bl_lock.png"/></div>
            <div class="container">
                <div class="col-sm-6">
                    <div class="footer-text">
                        <h4>Need something? <strong>Let me know!</strong></h4>
                        <br/>
                        <p>Lets discuss the details over some coffee. <br/>Send me a little bit of info about what you're thinking <br/>and we can get down to business.</p>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="footer-text">
                        <h5>Location:</h5>
                        <span>Huntington Beach, CA, USA</span>
                        <hr/>
                        <h5>Email:</h5>
                        <span><a href="mailto:nick.rick.interactive@gmail.com" target="_blank">nick.rick.interactive@gmail.com</a></span>
                        <hr/>
                        <h5>LinkedIn:</h5>
                        <span><a href="http://www.linkedin.com/in/nickrickenbach" target="_blank">http://www.linkedin.com/in/nickrickenbach</a></span>
                    </div>
                </div>
            </div>
        </footer>
    </div>

    <script src="js/main.js"></script>

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
                function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='https://www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','UA-XXXXX-X','auto');ga('send','pageview');
    </script>
</body>
</html>

<!doctype html>
<html class="no-js" lang="" ng-app="BLANG">
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
        <span class="spinner" us-spinner="{radius:40, width:10, length: 4, color: '#ce0404'}" spinner-key="spinner-main"></span>
    </div>

    <div class="site">
        <header class="container-fluid main-header">
            <nav class="col-sm-12">
                HEADER
            </nav>
        </header>

        <div class="container-fluid">
            <div ng-view class="main-view"></div>
        </div>

        <footer class="container-fluid main-footer">
            <div class="container">
                <div class="col-sm-12">
                    FOOTER
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

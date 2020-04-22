<script type="text/javascript" src="./env_config.js"></script>
 <?php
  include($_SERVER['DOCUMENT_ROOT'].'/includes/htmlHeader.php');
?>

<script>
//Workaround made to differentiate PROD from DEV api url - Consider the use of Environment Variables.
//###############
document.cookie = 'API_URL='+ API_FETCH_URL;
</script>

<body>
  
  <div class="d-flex" id="wrapper">
    
    <?php
	include($_SERVER['DOCUMENT_ROOT'].'/includes/sideMenu.php');
  ?>

    <!-- Page Content -->
    <div id="page-content-wrapper">

      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom menuHab">
      

        <button style="position:fixed;" class="navbar-toggler scmenuHam" type="button" id="menu-toggle"	 >
          <span class="navbar-toggler-icon"></span>
        </button>
		
	

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container-fluid">
 
<?php
	include($_SERVER['DOCUMENT_ROOT'].'/includes/firsPage.php');
?>

 
<?php
	include($_SERVER['DOCUMENT_ROOT'].'/includes/bottomMenu.php');
?>


      </div>
    </div>
    <!-- /#page-content-wrapper -->

  </div>
  <!-- /#wrapper -->

  <!-- Bootstrap core JavaScript -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
 	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	<script >
 <?php
	include($_SERVER['DOCUMENT_ROOT'].'/includes/auth.php');
?>
	var id_token='<?=$id_token?>';
	</script>
	<script src="js/script.js"></script>


  <!-- Menu Toggle Script -->
  <script>
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

  </script>
</body>

</html>
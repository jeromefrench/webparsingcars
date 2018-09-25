<?php
session_start();
?>


<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="style-parking.css" />
	<title>Agregateur autotrader</title>
</head>
<body>
	<h1>Visualiser annonce auto trader</h1>
<?php

if(!(isset($_SESSION['stage'])))
{
	$_SESSION['stage'] = 'stage1';
}


if ($_SESSION['stage'] == 'stage1')
{
	$output = shell_exec('./codeminimalpuppeteer');

	echo '</br>';
	echo '</br>';
	echo '</br>';
	echo '</br>';
	$matrice = explode("\\n",$output);
	echo '<form method="post" action="parking.php" >';
	echo '<p>Veuillez choisir la marque du vehicule</p>';
	echo '<select name="make" id="make">';
	$i = 1;
	while($i < count($matrice) - 1)
	{
		echo '<option value=',$i,'>',$matrice[$i].'</option>';
		$i++;
	}
	echo'</select>';
	$_SESSION['matrice'] = $matrice;
	$_SESSION['stage'] = 'stage2';
	echo '<input type="submit" value="Valider" />';
	echo '</form>';
}
elseif ($_SESSION['stage'] == 'stage2')
{
	echo 'Veuillez choisir le modele pour '. $_SESSION['matrice'][$_POST['make']];
	//echo '<br/>';

	$_SESSION['make'] =  $_SESSION['matrice'][$_POST['make']];
	$str = './model '. $_POST['make'];
	$output = shell_exec($str);
	//echo $output;
	$matrice = explode(")",$output);
	//echo $matrice[2];
	echo '<form method="post" action="parking.php" >';
	echo '<select name="modele" id="make">';
	$i = 1;
	while($i < count($matrice) - 1)
	{
		echo '<option value=',$i,'>',$matrice[$i].')</option>';
		$i++;
	}
	echo'</select>';
	$_SESSION['stage'] = 'stage3';
	$_SESSION['bordel'] = $matrice;
	$_SESSION['numero'] = $_POST['make'];
	echo '<input type="submit" value="Valider" />';
	echo '</form>';

}
elseif ($_SESSION['stage'] == 'stage3')
{
	echo 'nous arrivons au '.$_SESSION['stage'].'<br/>';
	echo 'la marque du vehicule est '.$_SESSION['make'].'<br/>';
	echo 'le modele du vehicule est '.$_SESSION['bordel'][$_POST['modele']].'<br/>';
	
	$_SESSION['modele']= $_SESSION['bordel'][$_POST['modele']];
	$str = './makemodelaffichage "'. $_SESSION['numero']. '" "'.$_SESSION['modele'].'"';
	$output = shell_exec($str);


	echo $output

?>






<?php



}
else
{
	echo 'error';
}
?>
<script>
console.log("test script");
</script>
	</body>
</html>

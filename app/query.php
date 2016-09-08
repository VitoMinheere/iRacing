<?php
$connection = mysqli_connect('127.0.0.1', 'root', '', 'iracing'); //The Blank string is the password
// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$tracks = $_GET['tracks'];
$cars = $_GET['cars'];
$series = '';
$class = '';

if (!isset($_GET['class'])) {
    $class = '';
}

if (!isset($_GET['series'])) {
    $series = '';
}

$query =  " SELECT  *
			FROM 2016s4
			JOIN car
			ON car.id = 2016s4.car
			JOIN track
			ON track.id = 2016s4.track
			JOIN series
			ON  series.id = 2016s4.series
		    WHERE car IN ($cars)
		    AND track IN ($tracks)


			"; //You don't need a ; like you do in SQL
$result = mysqli_query($connection, $query);

if($result === FALSE) {
    echo "No results found";
    die(mysql_error()); // TODO: better error handling
}



if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $data[] = $row;
    }
} else {
    echo 0;
};

if (isset($data)){
header('Content-Type: application/json');
echo json_encode($data);
}
//print_r(array_values($data));

//mysqli_close($connection); //Make sure to close out the database connection

?>
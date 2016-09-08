<?php
$connection = mysqli_connect('127.0.0.1', 'root', '', 'iracing'); //The Blank string is the password
// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}


$query =  " SELECT  *
			FROM series

			"; //You don't need a ; like you do in SQL
$data = array();
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
    echo "0 results";
};

header('Content-Type: application/json');
echo json_encode($data);
//print_r(array_values($data));

//mysqli_close($connection); //Make sure to close out the database connection

?>
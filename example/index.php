<?
$t = isset($_GET['list']) ? $_GET['list'] : '';

switch ($t) {

    case 'name' : 
    $a = array();
    for ($i = 0; $i< 5; $i++) {
        $a[] = array('uname' => 'username'.$i);
    }
    break;
    case 'nameandage' : 
    $a = array();
    for ($i = 0; $i< 5; $i++) {
        $a[] = array('uname' => 'username'.$i, 'uage'=>floor(rand(10,50)));
    }
    break;
}

echo json_encode($a);
?>

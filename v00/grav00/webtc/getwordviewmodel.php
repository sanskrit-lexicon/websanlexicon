<?php
error_reporting( error_reporting() & ~E_NOTICE );
?>
<?php 
/*getwordviewmodel.php
GetwordViewModel class  Takes a parameter object
   (of Parm class or an extension of Parm class)
   and constructs an html string for one 'key'
*/
require_once('dal.php');
require_once('basicadjust.php');
class GetwordViewModel {
 public $table, $table1, $status;
 public function __construct($getParms) {
  $dict = $getParms->dict;
  $key = $getParms->key;
  require_once("dal.php");  
  $dal = new Dal($dict);

  // matches is array of results from the dictionary database
  $matches = $dal->get1_basic($key);
  $dal->close();
  $nmatches = count($matches);
 
  if ($nmatches == 0) {
   $out = "<h2>not found: $getParms->keyin</h2>\n";
   $out1 = "<SA>$key</SA>";
   $out1 = transcoder_processElements($out1,"slp1",$filter,"SA");
   $table1 = $out + "<p>$out1</p>\n";
   $table = null;
   $this->status = false;
  }else {
   require_once("disp.php");
   $matches1=array();
   foreach($matches as $m) {
    $matches1[] = $m[2];  # the data field
   }
   // 07-01-2018
   // matches2 takes into account various adjustments preliminary to
   //  to the conversion of the xml to html that happens in BasicDisplay
   // This formerly done by line_adjust functions in disp.php
   $adjxml = new BasicAdjust($getParms,$matches1);
   $matches2 = $adjxml->adjxmlrecs;
   #$n = count($matches2);
   #dbgprint(true,"getwordviewmodel: $n Records from BasicAdjust\n");
   $filter = $getParms->filter;
   $display = new BasicDisplay($key,$matches2,$filter,$dict);
   $table = $display->table;

   $table1 = transcoder_processElements($table,"slp1",$filter,"SA");
   $this->status = true;
  }
  $this->table1 = $table1;
  $this->table = $table;
 } // __construct
}
?>

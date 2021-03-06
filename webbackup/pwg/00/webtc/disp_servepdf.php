<?php
/* disp_servepdf.php 
 pwg variant.
 getHrefPage generates markup for the link to a program which displays a pdf, as
 specified by the  input argument '$data'.
 In this implementation, the program which serves the pdf is
 $serve = ../webtc/servepdf.php.
 $data is assumed to be a string with a comma-delimited list of page numbers,
 only the first of which is used to generate a link.
 The markup returned for a given $lnum in the list $data is
   <a href='$serve?page=$lnum' target='_Blank'>$lnum</a>
 It is up to $serve to associate $lnum with a file.

*/
function getHrefPage($data) {
 $ans="";
 //$lnums = preg_split('/[,-]/',$data);
 $lnums = preg_split('/[,]/',$data);  //pwg
 $serve = "../webtc/servepdf.php";
 foreach($lnums as $lnum) {
  list($vol,$page) =  preg_split('/[,-]/',$lnum);
  $lnumref=$lnum;
  $ipage = intval($page);
  if (($ipage % 2) == 0) {
   $ipage = $ipage - 1;
   $lnumref = sprintf('%s-%04d',$vol,$ipage);
  }

  if ($ans == "") {
   $args = "page=$lnumref";
   $ans = "<a href='$serve?$args' target='_Blank'>$lnum</a>";
  }else {
   $ans .= ",$lnum";
  }
 }
 return $ans;
}

?>

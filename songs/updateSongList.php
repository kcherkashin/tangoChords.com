<?php
/**
 * Created by JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 * Date: 2/4/13
 * Time: 7:17 PM
 *
 */
error_reporting( E_ALL );
ini_set( "display_errors", 1 );


include( "functions.php" );
$config = Array(
    "gitDir" => "tangochords",
    /**
     * All songs must be located according to this pattern
     */
    "songsPattern" => "tangochords/chords/*.txt",
    /**
     * Git hub IP addresses.
     */
    "allowedAddresses" => Array( "07.97.227.253", "50.57.128.197", "108.171.174.178", "50.57.231.61", "216.15.12.95" ),

);

/**
 * We only want Git to run this file.
 */
validateAccess( $_SERVER[ "REMOTE_ADDR" ], $config[ "allowedAddresses" ] );

gitPull( $config[ "gitDir" ] );


$songs = getSongs( $config[ "songsPattern" ] );
file_put_contents( "songs.json", json_encode( $songs ) );
echo count( $songs ) . " songs updated<hr>";
echo "Good job :)";
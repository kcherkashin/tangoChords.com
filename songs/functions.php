<?php
/**
 * Created by JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 * Date: 2/4/13
 * Time: 8:50 PM
 *
 */


/**
 * Only allows access for certain IP addresses.
 */
function validateAccess( $IP, $allowedAddresses ) {
    if ( !in_array( $IP, $allowedAddresses ) ) {
        die( "Wrong ip address: " . $IP );
    }
}


/**
 * Parses the song which should come in the following format:
 *
 * "Name: Song name
 * Genre: Genre
 * .... : ....
 * Singer: Singer
 *
 * Am          Dm
 * Actual song text
 *
 * C      G
 * second line
 * ....
 * "
 *
 * @param $songText String Text of the song
 * @param $songMeta Array
 */
function parseSong( $songText, $songMeta = Array() ) {
    // While each line has "key: value" pattern, parse it and put it to the array
    while ( preg_match( "/^(.*):(.*)$/i", array_shift( $songText ), $matches ) ) {
        $key = htmlspecialchars( trim( strtolower( $matches[ 1 ] ) ) );
        $value = htmlspecialchars( trim( $matches[ 2 ] ) );
        $songMeta[ $key ] = $value;
    }
    // Whatever is left is a text
    $songMeta[ "text" ] = join( "", $songText );
    return $songMeta;
}


/**
 * Updates files from the github
 */
function gitPull( $dir ) {
    exec( "cd $dir; git reset --hard HEAD; git pull", $output, $var );

}


/**
 * Gets all files matching the pattern, parses it, and put into an array
 *
 * @param $pattern
 * @return array Songs
 */
function getSongs( $pattern ) {
    $songs = Array();
    $songFiles = glob( $pattern );

    foreach ( $songFiles as $file ) {
        $songs[ ] = parseSong(
            file( $file ),
            Array( "name" => basename( $file, ".txt" ) )
        );
    }

    return $songs;
}


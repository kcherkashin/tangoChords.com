/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";


describe( "isChordLine", function () {


    var template = Ext.create( "chords.view.song.songSingle" ).getTpl();


    it( "matches all basic chords", function () {
        [
            "A", "B", "C", "D", "E", "F", "G", "H",
            "Am", "Bm", "Cm", "Dm", "Em", "Fm", "Gm", "Hm",
            "A#", "B#", "C#", "D#", "E#", "F#", "G#", "H#",
            "A#m", "B#m", "C#m", "D#m", "E#m", "F#m", "G#m", "H#m"
        ].forEach( function ( chord ) {
                expect( template.isChordLine( chord ) ).toBeTruthy();
            } );
    } );


    it( "matches all possible Chords", function () {
        [
            "AMajor", "Amaj7", "Amaj9", "Amaj11", "Amaj13", "Amaj9#11", "Amaj13#11", "A6", "Aadd9", "A6add9", "Amaj7b5", "Amaj7#5", "AMinor", "Am7", "Am9", "Am11", "Am13", "Am6", "Amadd9", "Am6add9", "Ammaj7", "Ammaj9", "Am7b5", "Am7#5", "A7", "A9", "A11", "A13", "A7sus4", "A7b5", "A7#5", "A7b9", "A7#9", "A9b5", "A9#5", "A13#11", "A13b9", "A11b9", "Aaug", "Adim", "Adim7", "A5", "Asus4", "Asus2", "Asus2sus4", "A-5"
        ].forEach( function ( chord ) {
                expect( template.isChordLine( chord ) ).toBeTruthy();
            } );
    } );

    it( "Doesn't match anything which is not a chord", function () {
        [
            "dsd", "A200", "a", "z", "Z", "ssas", "Not a chord"
        ].forEach( function ( chord ) {
                expect( template.isChordLine( chord ) ).not.toBeTruthy();
            } );
    } );

    it( "ignores spaces", function () {
        [  " A     ", "          Amaj9" ].forEach( function ( chord ) {
            expect( template.isChordLine( chord ) ).toBeTruthy();
        } );
    } );

    it( "Matches multiple chords ", function () {
        [  " A    Am         Dm   ", "    Amaj13      Amaj9" ].forEach( function ( chord ) {
            expect( template.isChordLine( chord ) ).toBeTruthy();
        } );
    } );

    it( "Doesn't match line if  it has anything but chords ", function () {
        [  " A    Am   z      Dm   ", "    Amaj13    q  Amaj9" ].forEach( function ( chord ) {
            expect( template.isChordLine( chord ) ).not.toBeTruthy();
        } );
    } );

} );
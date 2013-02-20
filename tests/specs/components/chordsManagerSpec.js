/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

describe( "Chords matcher", function () {
    var chordsManager = chords.components.chordsManager;

    it( "matches all basic chords", function () {
        [
            "A", "B", "C", "D", "E", "F", "G", "H",
            "Am", "Bm", "Cm", "Dm", "Em", "Fm", "Gm", "Hm",
            "A#", "B#", "C#", "D#", "E#", "F#", "G#", "H#",
            "A#m", "B#m", "C#m", "D#m", "E#m", "F#m", "G#m", "H#m"
        ].forEach( function ( chord ) {
                expect( chordsManager.isChordLine( chord ) ).toBeTruthy();
            } );
    } );


    it( "matches all possible Chords", function () {
        [
            "AMajor", "Amaj7", "Amaj9", "Amaj11", "Amaj13", "Amaj9#11", "Amaj13#11", "A6", "Aadd9", "A6add9", "Amaj7b5", "Amaj7#5", "AMinor", "Am7", "Am9", "Am11", "Am13", "Am6", "Amadd9", "Am6add9", "Ammaj7", "Ammaj9", "Am7b5", "Am7#5", "A7", "A9", "A11", "A13", "A7sus4", "A7b5", "A7#5", "A7b9", "A7#9", "A9b5", "A9#5", "A13#11", "A13b9", "A11b9", "Aaug", "Adim", "Adim7", "A5", "Asus4", "Asus2", "Asus2sus4", "A-5"
        ].forEach( function ( chord ) {
                expect( chordsManager.isChordLine( chord ) ).toBeTruthy();
            } );
    } );
    it( "matches chords with second bass note", function () {
        [
            "   A/E"
        ].forEach( function ( chord ) {
                expect( chordsManager.isChordLine( chord ) ).toBeTruthy();
            } );
    } );

    it( "Doesn't match anything which is not a chord", function () {
        [
            "dsd", "A200", "a", "z", "Z", "ssas", "Not a chord"
        ].forEach( function ( chord ) {
                expect( chordsManager.isChordLine( chord ) ).not.toBeTruthy();
            } );
    } );

    it( "ignores spaces", function () {
        [  " A     ", "          Amaj9" ].forEach( function ( chord ) {
            expect( chordsManager.isChordLine( chord ) ).toBeTruthy();
        } );
    } );

    it( "Matches multiple chords ", function () {
        [  " A    Am         Dm   ", "    Amaj13      Amaj9" ].forEach( function ( chord ) {
            expect( chordsManager.isChordLine( chord ) ).toBeTruthy();
        } );
    } );

    it( "Doesn't match line if  it has anything but chords ", function () {
        [  " A    Am   z      Dm   ", "    Amaj13    q  Amaj9" ].forEach( function ( chord ) {
            expect( chordsManager.isChordLine( chord ) ).not.toBeTruthy();
        } );
    } );
    it( "Matches whole lines", function () {
        [  "   D         D#dim          D/F#          Fdim         Em A7" ].forEach( function ( chord ) {
            expect( chordsManager.isChordLine( chord ) ).toBeTruthy();
        } );
    } );
} );

describe( "Chords Transposer", function () {
    var chordsManager = chords.components.chordsManager;
    it( "Transpose basic chords", function () {
        var i, l;
        var input = ["A", "A#", "H", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
        var expectedResult = ["A#", "H", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"];
        for( i = 0, l = input.length; i < l; i++ ) {
            expect( chordsManager.transposeChord( input[i], 1 ) ).toBe( expectedResult[i] );
        }
    } );


    /**
     * Not sure if we need it, might be removed later
     */
    it( "Understands unusual chords with #", function () {
        var i, l;
        var input = ["A#", "B", "H#", "E#" ];
        var expectedResult = ["H", "C", "C#", "F#"];
        for( i = 0, l = input.length; i < l; i++ ) {
            expect( chordsManager.transposeChord( input[i], 1 ) ).toBe( expectedResult[i] );
        }
    } );

    it( "Understands all weird kinds of chords", function () {
        var i, l;
        var input = ["Edim", "E7", "Esus4", "Em" ];
        var expectedResult = ["Fdim", "F7", "Fsus4", "Fm"];
        for( i = 0, l = input.length; i < l; i++ ) {
            expect( chordsManager.transposeChord( input[i], 1 ) ).toBe( expectedResult[i] );
        }
    } );

    it( "Understands extra bass note", function () {
        var i, l;
        var input = ["A/E", "A#dim/H", "A#dim/C#" ];
        var expectedResult = ["A#/F", "Hdim/C", "Hdim/D"];

        for( i = 0, l = input.length; i < l; i++ ) {
            expect( chordsManager.transposeChord( input[i], 1 ) ).toBe( expectedResult[i] );

        }
    } );

    it( "Can transpose up few notes ", function () {
        expect( chordsManager.transposeChord( 'A', 2 ) ).toBe( 'H' );
        expect( chordsManager.transposeChord( 'A', 3 ) ).toBe( 'C' );
        expect( chordsManager.transposeChord( 'A', 8 ) ).toBe( 'F' );
        expect( chordsManager.transposeChord( 'A', 10 ) ).toBe( 'G' );
        expect( chordsManager.transposeChord( 'A', 12 ) ).toBe( 'A' );
        expect( chordsManager.transposeChord( 'A', 24 ) ).toBe( 'A' );
        expect( chordsManager.transposeChord( chordsManager.transposeChord( 'D', 1 ), 1 ) ).toBe( 'E' );

    } );
    it( "takes string as a number of steps  ", function () {
        expect( chordsManager.transposeChord( 'D', "1" ) ).toBe( 'D#' );
    } );
} );
describe( "Chords manager", function () {

    /**
     * Chords manager is a singleton, however it doesn't have any state, so we can just instantiate it here.
     */
    var chordsManager = chords.components.chordsManager;


    it( "Transpose basic chords", function () {
        var i, l;
        var input = ["A", "A#", "H", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
        var expectedResult = ["A#", "H", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"];
        for( i = 0, l = input.length; i < l; i++ ) {
            expect( chordsManager.transposeChord( input[i], 1 ) ).toBe( expectedResult[i] );
        }
    } );

    /**
     * Not sure if we need it, might be removed later
     */
    it( "Understands unusual chords with #", function () {
        var i, l;
        var input = ["A#", "B", "H#", "E#" ];
        var expectedResult = ["H", "C", "C#", "F#"];
        for( i = 0, l = input.length; i < l; i++ ) {
            expect( chordsManager.transposeChord( input[i], 1 ) ).toBe( expectedResult[i] );
        }
    } );

    it( "Understands all weird kinds of chords", function () {
        var i, l;
        var input = ["Edim", "E7", "Esus4", "Em" ];
        var expectedResult = ["Fdim", "F7", "Fsus4", "Fm"];
        for( i = 0, l = input.length; i < l; i++ ) {
            expect( chordsManager.transposeChord( input[i], 1 ) ).toBe( expectedResult[i] );
        }
    } );

    it( "Understands extra bass note", function () {
        var i, l;
        var input = ["A/E", "A#dim/H", "A#dim/C#" ];
        var expectedResult = ["A#/F", "Hdim/C", "Hdim/D"];

        for( i = 0, l = input.length; i < l; i++ ) {
            expect( chordsManager.transposeChord( input[i], 1 ) ).toBe( expectedResult[i] );

        }
    } );

    it( "Can transpose up few notes ", function () {
        expect( chordsManager.transposeChord( 'A', 2 ) ).toBe( 'H' );
        expect( chordsManager.transposeChord( 'A', 3 ) ).toBe( 'C' );
        expect( chordsManager.transposeChord( 'A', 8 ) ).toBe( 'F' );
        expect( chordsManager.transposeChord( 'A', 10 ) ).toBe( 'G' );
        expect( chordsManager.transposeChord( 'A', 12 ) ).toBe( 'A' );
        expect( chordsManager.transposeChord( 'A', 24 ) ).toBe( 'A' );
        expect( chordsManager.transposeChord( chordsManager.transposeChord( 'D', 1 ), 1 ) ).toBe( 'E' );

    } );
    it( "takes string as a number of steps  ", function () {
        expect( chordsManager.transposeChord( 'D', "1" ) ).toBe( 'D#' );
    } );




} );
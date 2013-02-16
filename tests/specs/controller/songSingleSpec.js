/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";


describe( "Chords transposer", function () {

    beforeEach( function () {
        this.controller = chords.app.getController( "chords.controller.songSingle" );
    } );


    it( "Transpose basic chords", function () {
        var i, l;
        var input = ["A", "B", "H", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
        var expectedResult = ["B", "H", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"];
        for( i = 0, l = input.length; i < l; i++ ) {
            expect( this.controller.transposeChord( input[i], 1 ) ).toBe( expectedResult[i] );
        }
    } );

    /**
     * Not sure if we need it, might be removed later
     */
    it( "Understands unusual chords with #", function () {
        var i, l;
        var input = ["A#", "B#", "H#", "E#" ];
        var expectedResult = ["H", "C", "C#", "F#"];
        for( i = 0, l = input.length; i < l; i++ ) {
            expect( this.controller.transposeChord( input[i], 1 ) ).toBe( expectedResult[i] );
        }
    } );

    it( "Understands all weird kinds of chords", function () {
        var i, l;
        var input = ["Edim", "E7", "Esus4", "Em" ];
        var expectedResult = ["Fdim", "F7", "Fsus4", "Fm"];
        for( i = 0, l = input.length; i < l; i++ ) {
            expect( this.controller.transposeChord( input[i], 1 ) ).toBe( expectedResult[i] );
        }
    } );

    it( "Understands extra bass note", function () {
        var i, l;
        var input = ["A/E", "A#dim/H", "A#dim/C#" ];
        var expectedResult = ["B/F", "Hdim/C", "Hdim/D"];

        for( i = 0, l = input.length; i < l; i++ ) {
            expect( this.controller.transposeChord( input[i], 1 ) ).toBe( expectedResult[i] );

        }
    } );

    it( "Can transpose up few notes ", function () {
        expect( this.controller.transposeChord( 'D', 2 ) ).toBe( 'E' );
        expect( this.controller.transposeChord( 'D', 3 ) ).toBe( 'F' );
        expect( this.controller.transposeChord( 'A', 8 ) ).toBe( 'F' );
        expect( this.controller.transposeChord( 'A', 10 ) ).toBe( 'G' );
        expect( this.controller.transposeChord( 'A', 12 ) ).toBe( 'A' );
        expect( this.controller.transposeChord( 'A', 24 ) ).toBe( 'A' );
        expect( this.controller.transposeChord( this.controller.transposeChord( 'D', 1 ) , 1 ) ).toBe( 'E' );

    } );
    it( "takes string as a number of steps  ", function () {
        expect( this.controller.transposeChord( 'D', "1" ) ).toBe( 'D#' );
    } );



} );
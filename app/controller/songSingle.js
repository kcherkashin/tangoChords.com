/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

'use strict';

Ext.define( 'chords.controller.songSingle', {
    extend: 'Ext.app.Controller',
    requires: ['chords.view.song.songSingle'],
    config: {
        refs: {
            song: 'songsingle'
        },
        control: {
            song: {
                'initialize': 'setHandlers'
            }
        }
    },

    setHandlers: function ( song ) {
        song.element.on( 'tap', this.displayChord, this );

    },


    /**
     * Generates chord diagram.
     * It only supports basic chords so far.
     *
     * @param chordName
     * @return {String}
     */
    generateChordDiagram: function ( chordName ) {
        chordName = chordName.trim();
        var synonyms = {
            'A#': 'B'
        };
        for( var i in synonyms ) {
            if( synonyms.hasOwnProperty( i ) ) {
                chordName = chordName.replace( i, synonyms[i] );
            }
        }

        var chords =
        {
            'A': '02220x', 'A7': '02020x',
            'Am': '01220x', 'Am7': '31020x',
            'B': '13331x', 'B7': '13131x',
            'Bm': '12331x', 'Bm7': '42131x',
            'H': '24442x', 'H7': '20212x',
            'Hm': '23442x', 'Hm7': '20202x',
            'C': '01023x', 'C7': '35353x',
            'Cm': '34553x', 'Cm7': '64353x',
            'C#': '46664x', 'C#7': '46664x',
            'C#m': '45664x', 'C#m7': '75464x',
            'D': '2320xx', 'D7': '2120xx',
            'Dm': '1320xx', 'Dm7': '1120xx',
            'D#': '3431xx', 'D#7': '4231xx',
            'D#m': '2431xx', 'D#m7': '2231xx',
            'E': '001220', 'E7': '031220',
            'Em': '000220', 'Em7': '040020',
            'F': '112331', 'F7': '142131',
            'Fm': '111331', 'Fm7': '141131',
            'F#': '223442', 'F#7': '253242',
            'F#m': '222442', 'F#m7': '252242',
            'G': '300023', 'G7': '100023',
            'Gm': '333553', 'Gm7': '363353',
            'G#': '445664', 'G#7': '475465',
            'G#m': '444664', 'G#m7': '474465'
        };
        var system = 'EBGDAE';
        var chart = chords[chordName];
        if( !chart ) {
            return 'No chord \'' + chordName + '\' in the database';
        }

        var line, index, chord = '';
        for( var x = 0; x < 6; x++ ) {
            line = '-|--------\n'.split( '' );
            index = +chart[x];
            if( index > 0 ) {
                index++;
            }
            line[ index ] = 'x';
            chord += system[x] + ' ' + line.join( '' );
        }

        return '<pre class = "chord-diagram">' + chord + '</pre>';
    },

    /**
     * Displays chord diagram for a chord
     * @param obj
     * @param target
     */
    displayChord: function ( obj, target ) {
        var chordName;
        if( target.className.match( /\bchord\b/ ) ) {
            chordName = target.innerHTML;
            Ext.Msg.alert( 'Chord ' + chordName, this.generateChordDiagram( chordName ), Ext.emptyFn );
        }
    }




} );
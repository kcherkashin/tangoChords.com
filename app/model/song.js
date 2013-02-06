/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";

Ext.define( 'chords.model.song', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            "id", "name", "genre", "performer", "words", "text",
        /**
         * Chords field contains text with all the chords highlighted.
         */
            {   name:    'chords',
                type:    'string',
                /**
                 * Go through the text, find all chords, and wrap them into span with "chord" class.
                 *
                 */
                convert: function ( v, record ) {
                    var text = record.data.text;
                    var chords = "";

                    /**
                     *  Generic  Regexp to Match any chord
                     */
                    var chordBase = "[A-H][\\#b]?m?(7.?.?|5|9|sus2|sus4|7/9)?";

                    /**
                     *  This regex match line which has nothing but chords and spaces.
                     */
                    var chordsOnlyRegex = new RegExp( "^\\s*(" + chordBase + "\\s*)+$" );

                    /**
                     *  This regex is used to match and replace chords.
                     */
                    var chordsRegexp = new RegExp( "\\b(" + chordBase + ")\\b", "g" );


                    var lines = text.split( /[\n\r]/ );

                    /**
                     * We only want to work with lines that have nothing but the chords.
                     */
                    for( var i = 0, l = lines.length; i < l; i++ ) {
                        if( lines[i].match( chordsOnlyRegex ) ) {
                            lines[i] = lines[i].replace( chordsRegexp, "<span class = 'chord'>$1</span>" )
                            chords += '<p class = "chords-line">' + lines[i] + '</p>';
                        } else {
                            chords += '<p class = "text-line">' + lines[i] + '</p>';
                        }
                    }

                    return  chords;
                }}
        ]

    },

    getTitle: function () {
        return this.get( 'performer' ) + ' - ' + this.get( 'name' );
    }



} );

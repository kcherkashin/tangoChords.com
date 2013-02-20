/**
 * Created with JetBrains PhpStorm.
 * Author: Kirill Cherkashin
 *
 */

"use strict";
(function () {
    /**
     * TODO: Needs testing
     * http://scripterlative.com/files/noaccent.htm
     */


    var rExps = [
        {re: /[\xC0-\xC6]/g, ch: 'A'},
        {re: /[\xE0-\xE6]/g, ch: 'a'},
        {re: /[\xC8-\xCB]/g, ch: 'E'},
        {re: /[\xE8-\xEB]/g, ch: 'e'},
        {re: /[\xCC-\xCF]/g, ch: 'I'},
        {re: /[\xEC-\xEF]/g, ch: 'i'},
        {re: /[\xD2-\xD6]/g, ch: 'O'},
        {re: /[\xF2-\xF6]/g, ch: 'o'},
        {re: /[\xD9-\xDC]/g, ch: 'U'},
        {re: /[\xF9-\xFC]/g, ch: 'u'},
        {re: /[\xD1]/g, ch: 'N'},
        {re: /[\xF1]/g, ch: 'n'}
    ];

    function stripAccents( str ) {
        for( var i = 0, len = rExps.length; i < len; i++ )
            str = str.replace( rExps[i].re, rExps[i].ch );
        return str;
    }

    Ext.define( 'chords.model.song', {
        extend: 'Ext.data.Model',

        config: {

            fields: [
                "id", "name", "performer", "words", "text", "source",
                {
                    name: 'title',
                    convert: function ( v, record ) {
                        return record.data.performer + " - " + record.data.name;
                    }
                },

                {
                    name: 'genre',
                    convert: function ( v, record ) {
                        return v || 'Tango';
                    }
                }, {
                    name: 'genreShort',
                    convert: function ( v, record ) {
                        var genre = record.data.genre || 'Tango';
                        return  genre.substr( 0, 1 ).toUpperCase();

                    }
                },
                {
                    name: 'nameLatin',
                    convert: function ( v, record ) {
                        return stripAccents( record.data.name );
                    }
                },
                {
                    name: 'performerLatin',
                    convert: function ( v, record ) {
                        return stripAccents( record.data.performer );
                    }
                }
            ]

        }


    } );

}());
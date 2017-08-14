/**
 * Created by Troy on 8/12/2017.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Row, Input, Card, Col, Button} from 'react-materialize'

const SoundcloudForm = ({soundcloud}) =>
    (
        <div className="appContainer">
            <Row><Input s={6} label="Output Path"/></Row>
            <Row>
                <Input name='group1' type='checkbox' value='Download all Artist Songs'
                       label='Download the stream of a user (token needed)'/>

                <Input name='group1' type='checkbox' value='Download Songs '
                       label='Download all tracks of a user (including repost)' defaultValue='checked'/>
                <Input name='group1' type='checkbox' value='Download Songs ' label='Download all uploads of a user'
                       defaultValue='checked'/>
            </Row>
            <Row>
                <Input name='group1' type='checkbox' value='Download Songs ' label='Download all favorites of a user'
                       defaultValue='checked'/>
                <Input name='group1' type='checkbox' value='Download Songs ' label='Download all playlists of a user'
                       defaultValue='checked'/>
                <Input name='group1' type='checkbox' value='Download Songs '
                       label='Download all liked and owned playlists of a user' defaultValue='checked'/>
            </Row>
            <Row>
                <Input name='group1' type='checkbox' value='Download Songs ' label='Continue if a music already exist'
                       defaultValue='checked'/>

                <Input name='group1' type='checkbox' value='Download Songs ' label='Begin with a custom offset'
                       defaultValue='checked'/>
                <Input name='group1' type='checkbox' value='Download Songs ' label=' Use a custom path for this time'
                       defaultValue='checked'/>
                <Input name='group1' type='checkbox' value='addtofile'
                       label='Add the artist name to the filename if it isnt in the filename already'
                       defaultValue='checked'/>
            </Row>
            <Row>
                <Button waves='light'>Submit</Button>
            </Row>
            <Col m={6} s={12}>
                <Card className='blue-grey darken-1' textClassName='white-text' title='Tips' key={1}
                      actions={[<a href='https://github.com/flyingrub/scdl' target="_blank">Official Documentation</a>, <a>Star On Github</a>]}>
                    <p>1 - If your downloading a single song leave all boxes unchecked</p>
                    <p>2 - The official documentation is below</p>
                </Card>
            </Col>


        </div>
    );


export default SoundcloudForm
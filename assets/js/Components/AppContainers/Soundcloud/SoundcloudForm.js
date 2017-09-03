/**
 * Created by Troy on 8/12/2017.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Row, Input, Card, Col, Button} from 'react-materialize'
import {SoundcloudSubmission} from "./SoundCloudValidation";

const SoundcloudForm = ({soundcloud, updateDownloadOption, updateConfigurationOptions, updateLinkPath, updateOutputPath}) =>
    (
        <div className="appContainer">
            <Row><Input s={6} label="Link to Artist or Song Page" onChange={updateLinkPath}/></Row>
            <Row><Input s={6} label="Output Path" onChange={updateOutputPath}/></Row>
            <Row>
                <Input name='soundcloud-options' type='radio' alt="Download all Artist Songs"
                       label='Download the stream of a user (token needed)' onClick={(e) => {
                    updateDownloadOption('download_artist')
                }}/>

                <Input name='soundcloud-options' type='radio'
                       alt="Download Songs"
                       label='Download all tracks of a user (including repost)' defaultValue='checked'
                       onClick={(e) => {
                           updateDownloadOption('download_all_tracks_and_reposts')
                       }}/>
                <Input name='soundcloud-options' type='radio' value='download_user_uploads'
                       label='Download all uploads of a user'
                       defaultValue='checked' onClick={(e) => {
                    updateDownloadOption(e.target.value)
                }}/>
            </Row>
            <Row>
                <Input name='soundcloud-options' type='radio' value='download_favorites'
                       label='Download all favorites of a user'
                       defaultValue='checked' onClick={(e) => {
                    updateDownloadOption(e.target.value)
                }}/>
                <Input name='soundcloud-options' type='radio' value='download_playlist'
                       label='Download all playlists of a user'
                       defaultValue='checked' onClick={(e) => {
                    updateDownloadOption(e.target.value)
                }}/>
                <Input name='soundcloud-options' type='radio' value='download_like_and_owned_playlists'
                       label='Download all liked and owned playlists of a user' defaultValue='checked'
                       onClick={(e) => {
                           updateDownloadOption(e.target.value)
                       }}/>
            </Row>
            <Row>
                <Input name='soundcloud-options' type='checkbox' value='continue_if_exists'
                       label='Continue if a music already exist'
                       defaultValue='checked' onClick={(e) => {
                           updateConfigurationOptions(e.target.value)
                       }}/>
                <Input name='group1' type='checkbox' value='add_artist_to_filename'
                       label='Add the artist name to the filename if it isnt in the filename already'
                       defaultValue='checked' onClick={(e) => {
                           updateConfigurationOptions(e.target.value)
                       }}/>
            </Row>
            <Row>
                <Button waves='light' onClick={SoundcloudSubmission}>Submit</Button>
            </Row>
            <Col m={6} s={12}>
                <Card className='blue-grey darken-1' textClassName='white-text' title='Tips' key={1}
                      actions={[<a href='https://github.com/flyingrub/scdl' target="_blank">Official Documentation</a>,
                          <a>Github</a>]}>
                    <p>1 - If your downloading a single song leave all boxes unchecked</p>
                    <p>2 - The official documentation is below</p>
                    <p>3 - Will soon support batch downloading of artists</p>
                </Card>
            </Col>


        </div>
    );


export default SoundcloudForm
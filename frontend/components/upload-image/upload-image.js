import React from 'react';
import Transition from 'react-addons-css-transition-group';
import * as qiniu from 'qiniu-js';
import axios from 'axios';
import { getRandom } from '../../utils';

import PropTypes from 'prop-types';

import './upload-image.styl';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      avatar: ''
    };
  }

  static propTypes = {
    onUploadCompleted: PropTypes.func
  }

  open = () => {
    this.setState({ show: true });
  }

  close = () => {
    this.setState({ show: false });
  }

  uploadCompleted = (avatar) => {
    this.props.onUploadCompleted(avatar);
  }

  changeFile = async (e) => {
    const that = this;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = async function() {
      const { token, domain } = (await axios.get('/qiniu')).data;

      const blob = new Blob([new Uint8Array(this.result)], { type: file.type });

      const observable = qiniu.upload(
        blob,
        `avatar/${Date.now()}_${getRandom(1000, 9999)}`,
        token,
        {},
        { region: qiniu.region.z2 }
      );

      observable.subscribe({
        error(err) {
          console.log(err);
        },
        complete(res) {
          that.uploadCompleted(`http://${domain}/${res.key}`);
          that.close();
        }
      });
    };
  }

  render() {
    const content = (
      <div className="upload-image" onClick={ this.close }>
        <div className="content">
          <div className="photos" onClick={ e => e.stopPropagation() }>
            <input type="file" accept="image/*" onChange={ this.changeFile } />
            <p>从相册选择</p>
          </div>
          <div className="camera">
            <input type="file" accept="image/*" capture="camera" />
            <p>照相机</p>
          </div>
          <div className="cancel">取消</div>
        </div>
      </div>
    );
    return (
      <Transition
        transitionName="popup"
        transitionEnterTimeout={ 300 }
        transitionLeaveTimeout={ 300 }
      >
        { this.state.show && content }
      </Transition>
    );
  }
}

export default UploadImage;

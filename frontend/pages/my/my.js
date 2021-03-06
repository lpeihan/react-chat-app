import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, modifyMyInfo } from '../../store/actions/auth';
import { Toast } from 'antd-mobile';

import Navbar from '../../components/navbar/navbar';
import MyField from './my-field';
import UploadImage from '../../components/upload-image/upload-image';
import Confirm from '../../components/confirm/confirm';
import Picker from '../../components/picker/picker';

import './my.styl';

class My extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
    modifyMyInfo: PropTypes.func
  }

  openUploadImage = () => {
    this.refs.uploadImage.open();
  }

  uploadCompleted = async (avatar) => {
    await this.props.modifyMyInfo({ avatar });
    Toast.success('头像修改成功', 2);
  }

  openConfirm = () => {
    this.refs.confirm.open();
  }

  openPicker = () => {
    this.refs.picker.open();
  }

  confirmLogout = () => {
    this.props.logout();
  }

  confirmPicker = async (value) => {
    await this.props.modifyMyInfo({ sex: value === '男' ? 0 : 1 });
    Toast.success('信息修改成功', 2);
  }

  render() {
    return (
      <div className="my">
        <Navbar title="我的" />
        <MyField name="头像" avatar={ this.props.user.avatar } onClick={ this.openUploadImage } />
        <MyField name="用户名" text={ this.props.user.username } />
        <MyField name="性别" text={ this.props.user.sex ? '女' : '男' } onClick={ this.openPicker } />

        <UploadImage ref="uploadImage" onUploadCompleted={ this.uploadCompleted } />

        <div className="logout" onClick={ this.openConfirm }>退出登录</div>
        <Confirm ref="confirm" onConfrim={ this.confirmLogout } />
        <Picker ref="picker" options={ ['男', '女'] }
          onConfirm={ this.confirmPicker } index={ this.props.user.sex }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { logout, modifyMyInfo })(My);

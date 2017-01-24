import React from 'react';
import AppActions from '../actions/appActions.js';
import PageConstants from '../constants/pageConstants.js';

var TermsOfUse = React.createClass({

  goBackToSignUp: function() {
    AppActions.changePage(PageConstants.SIGNUP);
  },

  render: function() {
    var zh_TWTermsOfUseContent =
      <div>
        <p>MediaTek Cloud Sandbox提供您不可或缺的雲端服務，幫助您開發物聯網應用。當您接受使用者條款後，方能註冊和使用我們的網站服務。 使用MediaTek Cloud Sandbox將會有一些符合法律的使用通知的條款 (<a target='_blank' href='http://www.mediatek.com/en/legal-notice/'>http://www.mediatek.com/en/legal-notice/</a>) 和隱私政策 (<a target='_blank' href='http://www.mediatek.com/en/privacy-policy/'>http://www.mediatek.com/en/privacy-policy/</a>) MediaTek Cloud Sandbox保留隨時變更使用條款的權利。</p>
        <p><u>基本條款</u></p>
        <p>MediaTek Cloud Sandbox提供網站服務，API服務，和其他由MediaTek Cloud Sandbox提供幫助用戶建立物聯網應用等服務。MediaTek Cloud Sandbox用戶能夠從設備及其管理層來收集，存儲，共享數據。通過使用該服務，您也接受使用條款並同意以下條款和使用條件的約束：</p>
        <ol>
          <li>您同意接受法律聲明 (http://www.mediatek.com/en/legal-notice/) 和隱私政策 (http://www.mediatek.com/en/privacy-policy/).</li>
          <li>聯發科技保留以下權利（i）隨時變更或修改使用者條款，並不另行通知（ii）發送電子郵件通知使用者條款的更新。</li>
          <li>使用任何新的功能，擴展或增強的服務，其中包括新的工具和資源的釋放，都應遵守我們的使用條款。這些更改後若您繼續使用本服務表示您同意這些因新功能而產生的變化。</li>
          <li>您作為用戶將有責任定期審查任何的使用者條款更新或修改。聯發科技保留隨時以任何理由或沒有理由修改或中斷服務，並有可能不提供任何通知。對您或任何第三方，聯發科技概不負責修改使用者條款或中斷服務。</li>
          <li>違反任何使用條款將導致您的帳戶或終止服務。在您的帳戶終止後，您將不再能夠使用服務，聯發科技將保留將您所有的數據刪除的權力。</li>
        </ol>
      </div>;

    var zh_CNTermsOfUseContent =
      <div>
        <p>MediaTek Cloud Sandbox提供您不可或缺的云端服务，帮助您开发物联网应用。当您接受使用者条款后，方能注册和使用我们的网站服务。使用MediaTek Cloud Sandbox将会有一些符合法律的使用通知的条款(<a target='_blank' href='http://www.mediatek.com/en/legal-notice/'>http://www. mediatek.com/en/legal-notice/</a>) 和隐私政策(<a target='_blank' href='http://www.mediatek.com/en/privacy-policy/'>http:/ /www.mediatek.com/en/privacy-policy/</a>) MediaTek Cloud Sandbox保留随时变更使用条款的权利。 </p>
        <p><u>基本条款</u></p>
        <p>MediaTek Cloud Sandbox提供网站服务，API服务，和其他由MediaTek Cloud Sandbox提供帮助用户建立物联网应用等服务。 MediaTek Cloud Sandbox用户能够从设备及其管理层来收集，存储，共享数据。通过使用该服务，您也接受使用条款并同意以下条款和使用条件的约束：</p>
        <ol>
          <li>您同意接受法律声明(http://www.mediatek.com/en/legal-notice/) 和隐私政策(http://www.mediatek.com/en/privacy-policy/).</ li>
          <li>联发科技保留以下权利（i）随时变更或修改使用者条款，并不另行通知（ii）发送电子邮件通知使用者条款的更新。 </li>
          <li>使用任何新的功能，扩展或增强的服务，其中包括新的工具和资源的释放，都应遵守我们的使用条款。这些更改后若您继续使用本服务表示您同意这些因新功能而产生的变化。 </li>
          <li>您作为用户将有责任定期审查任何的使用者条款更新或修改。联发科技保留随时以任何理由或没有理由修改或中断服务，并有可能不提供任何通知。对您或任何第三方，联发科技概不负责修改使用者条款或中断服务。 </li>
          <li>违反任何使用条款将导致您的帐户或终止服务。在您的帐户终止后，您将不再能够使用服务，联发科技将保留将您所有的数据删除的权力。 </li>
        </ol>
      </div>;

    var enTermsOfUseContent =
      <div>
        <p>MediaTek Cloud Sandbox provides your essential cloud services to help building your applications in the world of Internet of Things. Your registration and use of our service and website is subject to the agreement of terms of use. MediaTek Cloud Sandbox is provided with some limitations and terms of use that complies with legal notice (<a target='_blank' href='http://www.mediatek.com/en/legal-notice/'>http://www.mediatek.com/en/legal-notice/</a>) and privacy policy (<a target='_blank' href='http://www.mediatek.com/en/privacy-policy/'>http://www.mediatek.com/en/privacy-policy/</a>) . MediaTek Cloud Sandbox reserves the right for change the terms of use over time.</p>
        <p><u>Basic Terms</u></p>
        <p>MediaTek Cloud Sandbox provides website, API services and other services made available by MediaTek Cloud Sandbox to enable user to build applications for the internet of Things. MediaTek Cloud Sandbox enables users to collect, store, share data from devices and its managements. By using the service, you are also accepting the terms of use and agree to be bound by the following terms and conditions of use:</p>
        <ol>
          <li>You agree to accept legal notice (http://www.mediatek.com/en/legal-notice/) and privacy policy (http://www.mediatek.com/en/privacy-policy/).</li>
          <li>MediaTek reserves the right to update or change the Terms of Use at any time without notice by (i) revising Terms of Use document on or accessible through web site (ii) Sending information regarding the Terms of Use amendments as form of email.</li>
          <li>New features that extend or enhance the Service, including the release of new tools and resources, shall be subject to the Terms of Use. Continued use of the Service after any of these changes shall indicate your consent to these changes.</li>
          <li>You as the user is responsible for regularly reviewing the Terms of Use for any update or changes. MediaTek reserves the right to modify or discontinue the Service for any reason or no reason with or without notice to you. MediaTek shall not be liable to you or any third party should MediaTek exercise its right to revise these Terms of Use or modify or discontinue the Service.</li>
          <li>Violation of any of the Terms of Use will result in the termination of you account or the Service. Upon termination of your account you will no longer be able to use the Service and any of your data on the Service may be deleted by MediaTek.</li>
        </ol>
      </div>;

    /* 依照 url 去知道呈現什麼 terms of use 的 content */
    switch (window.location.pathname.split(/\//g)[2]){
      case 'zh-TW':
        var elem = zh_TWTermsOfUseContent;
        break;
      case 'zh-CN':
        var elem = zh_CNTermsOfUseContent;
        break;
      default:
        var elem = enTermsOfUseContent;
    }

    return (
      <div className="panel panel--sm panel--main center-block text-center panel--md">
        <div className="panel__heading">
          <img className="panel__heading__logo center-block" src="/imgs/logo.png" />
        </div>
        <div>
          <div className="panel__body">
            <div className="hr">
              <span className="hr__text">{__('Terms of Use')}</span>
            </div>
          </div>
          <div className="panel__body text-justify">
            { elem }
          </div>
          <button
            type="submit"
            className="btn btn-block btn--cancel"
            onClick={ this.goBackToSignUp }>
            {__('Back')}
          </button>
        </div>
      </div>
    );
  }
});

export default TermsOfUse;

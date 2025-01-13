const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600">Last updated: December 23, 2024</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Introduction */}
          <div className="p-8 border-b">
            <p className="text-gray-600 leading-relaxed">
              This Privacy Policy describes how Indore Taxi ("we", "us", or
              "our") collects, uses, and discloses your personal information
              when you visit or use our services. By using our services, you
              agree to the collection, use, and disclosure of your information
              as described in this Privacy Policy.
            </p>
          </div>

          {/* Main Content */}
          {sections.map((section, index) => (
            <div key={index} className="p-8 border-b last:border-b-0">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {section.title}
              </h2>
              <div className="prose max-w-none text-gray-600 space-y-4">
                <div className="text-gray-600 space-y-4">{section.content}</div>
              </div>
            </div>
          ))}

          {/* Contact Information */}
          <div className="bg-gray-50 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Questions About the Privacy Policy?
            </h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy or our
              practices, please contact us at:
            </p>

            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> mttindore@gmail.com
                mytravelsindore@gmail.com
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Address:</span> LG-3, Royal Glory,
                Plot No.GF 29-30, Side Walking Rd, Opposite Hotel Sayaji,Scheme
                No.54, Suyash Vihar, Vijay Nagar, Indore, Madhya Pradesh 452010
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Mobile:</span> +91 810 907 7400
                +91 999 353 4100 +91 731 407 7400
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const sections = [
  {
    title: "Changes to This Privacy Policy",
    content:
      "We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the 'Last updated' date and take any other steps required by applicable law.",
  },
  {
    title: "How We Collect and Use Your Personal Information",
    content:
      "To provide the Services, we collect personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us. In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide or improve or improve the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.",
  },
  {
    title: "What Personal Information We Collect",
    content:
      "The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term 'personal information', we are referring to information that identifies, relates to, describes or can be associated with you.",
  },
  {
    title: "Information We Collect Directly from You",
    content:
      "Information that you directly submit to us through our Services may include: Contact details including your name, address, phone number, and email. Order information including your name, billing address, shipping address, payment confirmation, email address, and phone number. Account information including your username, password, security questions and other information used for account security purposes. Customer support information including the information you choose to include in communications with us, for example, when sending a message through the Services. Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.",
  },
  {
    title: "Information We Collect about Your Usage",
    content:
      "We may also automatically collect certain information about your interaction with the Services ('Usage Data'). To do this, we may use cookies, pixels and similar technologies ('Cookies'). Usage Data may include information about how you access and use our Site and your account, including device information, browser information, information about your network connection, your IP address and other information regarding your interaction with the Services.",
  },
  {
    title: "Information We Obtain from Third Parties",
    content:
      "Finally, we may obtain information about you from third parties, including from vendors and service providers who may collect information on our behalf, such as: Companies who support our Site and Services, such as Woocommerce. Our payment processors, who collect payment information (e.g., bank account, credit or debit card information, billing address) to process your payment in order to fulfill your orders and provide you with products or services you have requested, in order to perform our contract with you.",
  },
  {
    title: "Cookies",
    content:
      "Like many websites, we use Cookies on our Site. For specific information about the Cookies that we use related to powering our store with Woocommerce, We use Cookies to power and improve our Site and our Services (including to remember your actions and preferences), to run analytics and better understand user interaction with the Services (in our legitimate interests to administer, improve and optimize the Services). We may also permit third parties and services providers to use Cookies on our Site to better tailor the services, products and advertising on our Site and other websites. Most browsers automatically accept Cookies by default, but you can choose to set your browser to remove or reject Cookies through your browser controls. Please keep in mind that removing or blocking Cookies can negatively impact your user experience and may cause some of the Services, including certain features and general functionality, to work incorrectly or no longer be available. Additionally, blocking Cookies may not completely prevent how we share information with third parties such as our advertising partners.",
  },
  {
    title: "How We Disclose Personal Information",
    content:
      "In certain circumstances, we may disclose your personal information to third parties for contract fulfillment purposes, legitimate purposes and other reasons subject to this Privacy Policy. Such circumstances may include: With vendors or other third parties who perform services on our behalf (e.g., IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping). With business and marketing partners to provide services and advertise to you. Our business and marketing partners will use your information in accordance with their own privacy notices. When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations, with your consent. With our affiliates or otherwise within our corporate group, in our legitimate interests to run a successful business. In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.",
  },
  {
    title: "Third Party Websites and Links",
    content:
      "Our Site may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.",
  },
  {
    title: "Children's Data",
    content:
      "The Services are not intended to be used by children, and we do not knowingly collect any personal information about children. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted. As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we 'share' or 'sell' (as those terms are defined in applicable law) personal information of individuals under 16 years of age.",
  },
  {
    title: "Security and Retention of Your Information",
    content:
      "Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee 'perfect security.' In addition, any information you send to us may not be secure while in transit. We recommend that you do not use insecure channels to communicate sensitive or confidential information to us. How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide the Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.",
  },
  {
    title: "Your Rights",
    content:
      "Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law. Right to Access / Know: You may have a right to request access to personal information that we hold about you, including details relating to the ways in which we use and share your information. Right to Delete: You may have a right to request that we delete personal information we maintain about you. Right to Correct: You may have a right to request that we correct inaccurate personal information we maintain about you. Right of Portability: You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions. Restriction of Processing: You may have the right to ask us to stop or restrict our processing of personal information. Withdrawal of Consent: Where we rely on consent to process your personal information, you may have the right to withdraw this consent. Appeal: You may have a right to appeal our decision if we decline to process your request. You can do so by replying directly to our denial.",
  },
  {
    title: "Managing Communication Preferences",
    content:
      "We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you. If you opt out, we may still send you non-promotional emails, such as those about your account or orders that you have made.",
  },
  {
    title: "International Users",
    content:
      "Please note that we may transfer, store and process your personal information outside the country you live in. Your personal information is also processed by staff and third party service providers and partners in these countries. If we transfer your personal information out of Europe, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.",
  },
];

export default PrivacyPolicy;

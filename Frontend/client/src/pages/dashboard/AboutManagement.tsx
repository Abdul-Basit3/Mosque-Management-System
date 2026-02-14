import { FaSave, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

const AboutManagement = () => {
  const aboutData = {
    organizationName: 'Islamic Center of Excellence',
    history: 'Founded in 1995, the Islamic Center of Excellence has been serving the Muslim community for over 25 years. What started as a small prayer space has grown into a comprehensive community center serving thousands of families.',
    mission: 'To provide a welcoming space for worship, education, and community building while promoting Islamic values and fostering understanding between different communities.',
    vision: 'To be a leading Islamic institution that empowers individuals and families to live fulfilling lives guided by Islamic principles while contributing positively to society.',
    values: 'Faith, Knowledge, Community, Compassion, Excellence, Unity, Service',
    address: '123 Main Street, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'info@islamiccenter.org',
    facebookUrl: 'https://facebook.com/islamiccenter',
    twitterUrl: 'https://twitter.com/islamiccenter',
    instagramUrl: 'https://instagram.com/islamiccenter',
    youtubeUrl: 'https://youtube.com/@islamiccenter',
    tiktokUrl: 'https://tiktok.com/@islamiccenter'
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">About Organization</h2>
        <button className="btn-primary flex items-center">
          <FaSave className="mr-2" /> Save Changes
        </button>
      </div>

      {/* Organization Name */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold mb-4">Organization Name</h3>
        <input
          type="text"
          defaultValue={aboutData.organizationName}
          className="input-field"
          placeholder="Organization Name"
        />
      </div>

      {/* History */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold mb-4">History</h3>
        <textarea
          defaultValue={aboutData.history}
          className="input-field min-h-32"
          placeholder="Organization history..."
        />
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Mission Statement</h3>
          <textarea
            defaultValue={aboutData.mission}
            className="input-field min-h-32"
            placeholder="Mission statement..."
          />
        </div>
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Vision Statement</h3>
          <textarea
            defaultValue={aboutData.vision}
            className="input-field min-h-32"
            placeholder="Vision statement..."
          />
        </div>
      </div>

      {/* Values */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold mb-4">Core Values</h3>
        <textarea
          defaultValue={aboutData.values}
          className="input-field min-h-24"
          placeholder="Core values (comma separated)..."
        />
        <p className="text-sm text-gray-600 mt-2">Separate values with commas</p>
      </div>

      {/* Contact Information */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Address</label>
            <textarea
              defaultValue={aboutData.address}
              className="input-field"
              rows={3}
            />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                defaultValue={aboutData.phone}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                defaultValue={aboutData.email}
                className="input-field"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold mb-4">Social Media Links</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaFacebook className="text-2xl text-blue-600" />
            <input
              type="url"
              defaultValue={aboutData.facebookUrl}
              className="input-field flex-1"
              placeholder="Facebook URL"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaTwitter className="text-2xl text-blue-400" />
            <input
              type="url"
              defaultValue={aboutData.twitterUrl}
              className="input-field flex-1"
              placeholder="Twitter/X URL"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaInstagram className="text-2xl text-pink-600" />
            <input
              type="url"
              defaultValue={aboutData.instagramUrl}
              className="input-field flex-1"
              placeholder="Instagram URL"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaYoutube className="text-2xl text-red-600" />
            <input
              type="url"
              defaultValue={aboutData.youtubeUrl}
              className="input-field flex-1"
              placeholder="YouTube URL"
            />
          </div>
          <div className="flex items-center gap-3">
            <FaTiktok className="text-2xl text-black" />
            <input
              type="url"
              defaultValue={aboutData.tiktokUrl}
              className="input-field flex-1"
              placeholder="TikTok URL"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="card bg-gray-50">
        <h3 className="text-xl font-bold mb-4">Preview</h3>
        <div className="bg-white p-6 rounded-lg">
          <h4 className="text-2xl font-bold mb-4">{aboutData.organizationName}</h4>
          
          <div className="mb-4">
            <h5 className="font-bold text-islamic-green mb-2">History</h5>
            <p className="text-gray-700">{aboutData.history}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h5 className="font-bold text-islamic-green mb-2">Mission</h5>
              <p className="text-gray-700">{aboutData.mission}</p>
            </div>
            <div>
              <h5 className="font-bold text-islamic-green mb-2">Vision</h5>
              <p className="text-gray-700">{aboutData.vision}</p>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="font-bold text-islamic-green mb-2">Core Values</h5>
            <div className="flex flex-wrap gap-2">
              {aboutData.values.split(',').map((value, index) => (
                <span key={index} className="px-3 py-1 bg-islamic-green text-white rounded-full text-sm">
                  {value.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h5 className="font-bold text-islamic-green mb-2">Contact</h5>
            <p className="text-gray-700">{aboutData.address}</p>
            <p className="text-gray-700">{aboutData.phone}</p>
            <p className="text-gray-700">{aboutData.email}</p>
          </div>

          <div>
            <h5 className="font-bold text-islamic-green mb-2">Follow Us</h5>
            <div className="flex gap-4">
              <FaFacebook className="text-2xl text-blue-600 cursor-pointer hover:scale-110 transition-transform" />
              <FaTwitter className="text-2xl text-blue-400 cursor-pointer hover:scale-110 transition-transform" />
              <FaInstagram className="text-2xl text-pink-600 cursor-pointer hover:scale-110 transition-transform" />
              <FaYoutube className="text-2xl text-red-600 cursor-pointer hover:scale-110 transition-transform" />
              <FaTiktok className="text-2xl text-black cursor-pointer hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutManagement;

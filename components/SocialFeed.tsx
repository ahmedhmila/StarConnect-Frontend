import { Twitter, Facebook, Share2 } from "lucide-react";

export default function SocialFeed() {
  return (
    <div className="bg-official-gray p-6 rounded-lg border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-official-blue flex items-center gap-2">
          <Share2 size={20} />
          Social Syndication
        </h3>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Live Feed</span>
      </div>

      <div className="space-y-4">
        {/* Mock Tweet */}
        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-black">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Twitter size={16} className="text-black" />
              <span className="font-bold text-xs">@MairieStarConnect</span>
            </div>
            <span className="text-xs text-gray-400">2h ago</span>
          </div>
          <p className="text-sm text-gray-700">
            We are proud to announce the new digital infrastructure project. Transparency is our priority. #Cameroon #Tech
          </p>
        </div>

        {/* Mock Facebook Post */}
        <div className="bg-white p-4 rounded shadow-sm border-l-4 border-blue-600">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Facebook size={16} className="text-blue-600" />
              <span className="font-bold text-xs">Mairie Officielle</span>
            </div>
            <span className="text-xs text-gray-400">5h ago</span>
          </div>
          <p className="text-sm text-gray-700">
            Visit our new shop to support local initiatives. Click the link in bio!
          </p>
          <div className="mt-2 h-24 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
            [Image Attachment]
          </div>
        </div>
      </div>
    </div>
  );
}
<script>
    import { Heart, User, Menu, Search, Calendar, Users } from 'lucide-svelte';
  </script>
  
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="text-3xl font-bold">
        <span class="text-[#00adb5]">W</span>
        <span class="text-[#ff385c]">M</span>
        <span class="text-[#ffbf00]">V</span>
      </div>
      <div class="flex items-center space-x-6">
        <Heart class="w-6 h-6 text-gray-600" />
        <User class="w-6 h-6 text-gray-600" />
        <Menu class="w-6 h-6 text-gray-600" />
      </div>
    </div>
    
    <div class="bg-gray-100 py-6">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold mb-1">Save up to 40% on your next hotel stay</h1>
        <p class="text-gray-600 text-sm mb-4">We compare hotel prices from 100s of sites</p>
        
        <div class="bg-white rounded-xl shadow-lg p-4">
          <div class="space-y-4">
            <div class="relative">
              <div class="absolute left-0 top-1 text-xs text-gray-500">Landmark</div>
              <div class="flex items-center">
                <Search class="absolute left-0 top-6 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value="Sentido OBLU Helengeli"
                  class="w-full pt-5 pb-2 pl-7 border-b border-gray-300 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div class="relative">
              <div class="absolute left-0 top-1 text-xs text-gray-500">Check-in/out</div>
              <div class="flex items-center">
                <Calendar class="absolute left-0 top-6 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value="Nov 18 - Nov 22"
                  class="w-full pt-5 pb-2 pl-7 border-b border-gray-300 text-sm focus:outline-none"
                  readonly
                />
              </div>
            </div>
            <div class="relative">
              <div class="absolute left-0 top-1 text-xs text-gray-500">Guests and rooms</div>
              <div class="flex items-center">
                <Users class="absolute left-0 top-6 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value="2 Guests, 1 Room"
                  class="w-full pt-5 pb-2 pl-7 border-b border-gray-300 text-sm focus:outline-none"
                  readonly
                />
              </div>
            </div>
          </div>
          <button class="w-full mt-6 bg-[#0071c2] text-white py-3 rounded-md font-semibold text-lg">
            Search
          </button>
        </div>
        
        <div class="flex justify-start items-center mt-6 space-x-4 overflow-x-auto pb-2">
          <img src="/api/placeholder/80/30" alt="Expedia logo" />
          <img src="/api/placeholder/100/30" alt="Booking.com logo" />
          <img src="/api/placeholder/80/30" alt="Hotels.com logo" />
        </div>
      </div>
    </div>
  </header>
  
  <style>
    /* Global styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  margin: 0;
  padding: 0;
}

/* Header styles */
.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.logo-w { color: #00adb5; }
.logo-m { color: #ff385c; }
.logo-v { color: #ffbf00; }

.header-icons {
  display: flex;
  gap: 24px;
}

.header-icon {
  width: 24px;
  height: 24px;
  color: #606060;
}

/* Main content styles */
.main-content {
  padding: 24px 16px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 14px;
  color: #606060;
  margin-bottom: 16px;
}

/* Search form styles */
.search-form {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 24px;
}

.input-group {
  position: relative;
  margin-bottom: 16px;
}

.input-label {
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 12px;
  color: #606060;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
}

.input-icon {
  width: 20px;
  height: 20px;
  color: #909090;
  margin-right: 8px;
}

.input-field {
  width: 100%;
  padding: 24px 4px 8px;
  border: none;
  font-size: 16px;
  background: transparent;
}

.input-field:focus {
  outline: none;
}

.search-button {
  width: 100%;
  background-color: #0071c2;
  color: #fff;
  border: none;
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;
}

.search-button:hover {
  background-color: #005fa3;
}

/* OTA logos styles */
.ota-logos {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 16px 0;
}

.ota-logo {
  height: 30px;
  object-fit: contain;
}
  </style>
const Implementation = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Seamless Deployment & Ongoing Support
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-gray-600 text-center mb-8">
              Our experienced team ensures a smooth implementation process, comprehensive training,
              and reliable ongoing support to maximize the value of your eWaybill Management System.
            </p>

            {/* Implementation Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>

              {/* Timeline items */}
              <div className="relative z-10">
                {/* Item 1 */}
                <div className="flex items-center mb-12">
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-xl font-bold mb-2">Requirements Analysis</h3>
                    <p className="text-gray-600">
                      We work closely with your team to understand your specific needs and customize
                      the system accordingly.
                    </p>
                  </div>
                  <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center z-10">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="w-1/2 pl-8">
                    <p className="text-gray-500 italic">Week 1-2</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center mb-12">
                  <div className="w-1/2 pr-8 text-right">
                    <p className="text-gray-500 italic">Week 3-4</p>
                  </div>
                  <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center z-10">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-xl font-bold mb-2">System Configuration</h3>
                    <p className="text-gray-600">
                      We configure the platform to match your state's specific requirements, fee
                      structures, and operational workflows.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-center mb-12">
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-xl font-bold mb-2">Training & Capacity Building</h3>
                    <p className="text-gray-600">
                      Comprehensive training for administrators, field officers, and other
                      stakeholders to ensure effective system utilization.
                    </p>
                  </div>
                  <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center z-10">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="w-1/2 pl-8">
                    <p className="text-gray-500 italic">Week 5-6</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <p className="text-gray-500 italic">Week 7-8</p>
                  </div>
                  <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center z-10">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-xl font-bold mb-2">Go-Live & Ongoing Support</h3>
                    <p className="text-gray-600">
                      Smooth transition to the live environment with dedicated support and regular
                      system updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Features */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Comprehensive Support Package</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">24/7 Technical Assistance</h4>
                <p className="text-gray-600">
                  Round-the-clock support for any technical issues or questions.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Regular Updates</h4>
                <p className="text-gray-600">
                  Continuous improvement with new features and security enhancements.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h4 className="font-bold mb-2">Training Programs</h4>
                <p className="text-gray-600">
                  Ongoing training for new staff and advanced feature utilization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Implementation;

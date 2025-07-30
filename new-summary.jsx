          {activeTab === 'summary' && (
            <div className="space-y-6">
              {/* Current Financial Status */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">M&A Wedding Financial Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-600 mb-2">Total We Owe</h4>
                    <p className="text-3xl font-bold text-purple-600">${ourPaymentsSummary.total.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">Our responsibility</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-600 mb-2">Total Saved</h4>
                    <p className="text-3xl font-bold text-green-600">${totalSavings.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">Available funds</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-600 mb-2">Due Sept 4th</h4>
                    <p className="text-3xl font-bold text-red-600">${sept4Summary.remaining.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">Immediate need</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-600 mb-2">Days Left</h4>
                    <p className="text-3xl font-bold text-blue-600">
                      {Math.max(0, Math.ceil((new Date('2025-10-04') - new Date()) / (1000 * 60 * 60 * 24)))}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Until wedding</p>
                  </div>
                </div>
              </div>

              {/* Action Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Immediate Actions */}
                <div className={`p-6 rounded-lg ${totalSavings >= sept4Summary.remaining ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className={`text-xl font-bold mb-4 ${totalSavings >= sept4Summary.remaining ? 'text-green-800' : 'text-red-800'}`}>
                    🚨 September 4th Status
                  </h3>
                  {totalSavings >= sept4Summary.remaining ? (
                    <div className="space-y-3">
                      <div className="bg-green-100 p-3 rounded">
                        <p className="text-green-800 font-semibold">✅ You're covered!</p>
                        <p className="text-green-700">You have ${(totalSavings - sept4Summary.remaining).toLocaleString()} extra</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-gray-700">September 4th vendors:</p>
                        {vendors.filter(v => v.dueDate === '2025-09-04' && (v.responsibility === 'Us' || v.responsibility === 'Michaela') && v.remaining > 0).map(vendor => (
                          <div key={vendor.id} className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm">{vendor.name}</span>
                            <span className="text-sm font-semibold">${vendor.remaining.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-red-100 p-3 rounded">
                        <p className="text-red-800 font-semibold">⚠️ Need to save more</p>
                        <p className="text-red-700">Need ${(sept4Summary.remaining - totalSavings).toLocaleString()} more by Sept 4th</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-gray-700">September 4th vendors:</p>
                        {vendors.filter(v => v.dueDate === '2025-09-04' && (v.responsibility === 'Us' || v.responsibility === 'Michaela') && v.remaining > 0).map(vendor => (
                          <div key={vendor.id} className="flex justify-between items-center bg-white p-2 rounded">
                            <span className="text-sm">{vendor.name}</span>
                            <span className="text-sm font-semibold text-red-600">${vendor.remaining.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Overall Status */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-blue-800">📊 Overall Wedding Status</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">Payment Progress</span>
                        <span className="text-sm font-medium">{Math.round((ourPaymentsSummary.paid / ourPaymentsSummary.total) * 100)}% paid</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                          style={{ width: `${(ourPaymentsSummary.paid / ourPaymentsSummary.total) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between bg-white p-2 rounded">
                        <span>Still owe:</span>
                        <span className="font-semibold text-red-600">${ourPaymentsSummary.remaining.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between bg-white p-2 rounded">
                        <span>Currently saved:</span>
                        <span className="font-semibold text-green-600">${totalSavings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between bg-white p-2 rounded border-t-2">
                        <span className="font-semibold">Overall gap:</span>
                        <span className={`font-bold ${totalSavings >= ourPaymentsSummary.remaining ? 'text-green-600' : 'text-red-600'}`}>
                          {totalSavings >= ourPaymentsSummary.remaining ? '+' : '-'}${Math.abs(totalSavings - ourPaymentsSummary.remaining).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">🎯 Next Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded">
                    <h4 className="font-semibold mb-3 text-orange-600">Upcoming Payments</h4>
                    <div className="space-y-2">
                      {vendors
                        .filter(v => (v.responsibility === 'Us' || v.responsibility === 'Michaela') && v.remaining > 0 && v.dueDate)
                        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                        .slice(0, 5)
                        .map(vendor => (
                          <div key={vendor.id} className="flex justify-between items-center py-2 border-b">
                            <div>
                              <span className="text-sm font-medium">{vendor.name}</span>
                              <p className="text-xs text-gray-500">Due: {new Date(vendor.dueDate).toLocaleDateString()}</p>
                            </div>
                            <span className="text-sm font-semibold">${vendor.remaining.toLocaleString()}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded">
                    <h4 className="font-semibold mb-3 text-green-600">Savings Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between py-1">
                        <span>Michaela:</span>
                        <span className="font-semibold">${ourFinances.michaelaSavings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Arrington:</span>
                        <span className="font-semibold">${ourFinances.arringtonSavings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Joint:</span>
                        <span className="font-semibold">${ourFinances.jointSavings.toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total Available:</span>
                          <span className="text-green-600">${totalSavings.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
import React from 'react';

// ─── Disputes Tab (With Jobs vs Failure Rate Bar Graph & Customer Differentiation) ──
export default function DisputesTab({ disputes, showToast, onSelectAgency }) {
  // Bar Graph Data: Jobs Accomplished vs Failure Rate
  const agencyStats = [
    { name: 'EcoPest Solutions', total: 880, accomplished: 864, failures: 16, successRate: 98.2, failRate: 1.8 },
    { name: 'Apex Pest Bangalore', total: 560, accomplished: 544, failures: 16, successRate: 97.1, failRate: 2.9 },
    { name: 'CleanShield NCR', total: 400, accomplished: 390, failures: 10, successRate: 97.5, failRate: 2.5 },
  ];

  const totalDispatched = agencyStats.reduce((acc, a) => acc + a.total, 0);
  const totalAccomplished = agencyStats.reduce((acc, a) => acc + a.accomplished, 0);
  const totalFailures = agencyStats.reduce((acc, a) => acc + a.failures, 0);
  const overallSuccessRate = ((totalAccomplished / totalDispatched) * 100).toFixed(1);
  const overallFailRate = ((totalFailures / totalDispatched) * 100).toFixed(1);

  const monthlyTrend = [
    { month: 'Jun', total: 240, successRate: 96.8, failRate: 3.2 },
    { month: 'Jul', total: 310, successRate: 97.2, failRate: 2.8 },
    { month: 'Aug', total: 380, successRate: 97.5, failRate: 2.5 },
    { month: 'Sep', total: 420, successRate: 97.8, failRate: 2.2 },
    { month: 'Oct', total: 490, successRate: 98.1, failRate: 1.9 },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#855300] font-bold bg-[#fea619]/20 px-2.5 py-0.5 rounded-full border border-[#fea619]/30">
              Quality Assurance &amp; Warranty Audits
            </span>
          </div>
          <h2 className="text-xl font-black text-[#003527]">Disputes &amp; SLA Compliance Desk</h2>
          <p className="text-sm text-[#707974] mt-0.5">Fleet accomplishment metrics, chemical guarantee escalations, and customer loyalty differentiation.</p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-red-100 text-red-800 border border-red-200 text-sm font-bold flex items-center gap-1.5 w-fit">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          {disputes.length} Escalations Under Review
        </span>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════
          BAR GRAPH: Jobs Accomplished vs Failure Rate
      ═════════════════════════════════════════════════════════════════════════ */}
      <div className="rounded-3xl border border-[#ebe8e3] bg-white p-6 shadow-xs flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">bar_chart</span>
            </div>
            <div>
              <h3 className="font-bold text-[#003527] text-base">Fleet Performance · Jobs Accomplished vs Failure Rate</h3>
              <p className="text-xs text-[#707974]">Comparative ratio of jobs completed without incident versus warranty breach/dispute claims</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <span className="w-3 h-3 rounded-md bg-[#003527]" />
              Accomplished ({overallSuccessRate}%)
            </span>
            <span className="flex items-center gap-1.5 text-red-700">
              <span className="w-3 h-3 rounded-md bg-[#dc2626]" />
              Failure Rate ({overallFailRate}%)
            </span>
          </div>
        </div>

        {/* Top Metric Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3]">
            <span className="text-[10px] uppercase tracking-wider text-[#707974] font-bold block">Total Dispatched</span>
            <span className="text-2xl font-black text-[#1c1c19] mt-0.5 block">{totalDispatched.toLocaleString()}</span>
            <span className="text-[11px] text-[#707974] mt-0.5 block">Across all partner hubs</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold block">Jobs Accomplished</span>
            <span className="text-2xl font-black text-emerald-800 mt-0.5 block">{totalAccomplished.toLocaleString()}</span>
            <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">✓ {overallSuccessRate}% Flawless Run</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-200">
            <span className="text-[10px] uppercase tracking-wider text-red-800 font-bold block">Failure / Dispute Rate</span>
            <span className="text-2xl font-black text-red-700 mt-0.5 block">{totalFailures}</span>
            <span className="text-[11px] text-red-700 font-semibold mt-0.5 block">⚠ {overallFailRate}% Escalation Ratio</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3]">
            <span className="text-[10px] uppercase tracking-wider text-[#855300] font-bold block">Mean Resolution SLA</span>
            <span className="text-2xl font-black text-[#855300] mt-0.5 block">4.2 hrs</span>
            <span className="text-[11px] text-[#707974] mt-0.5 block">Escrow Arbitration Target</span>
          </div>
        </div>

        {/* Agency-by-Agency Visual Stacked Bar Graph */}
        <div className="flex flex-col gap-4 pt-2">
          <span className="text-xs font-bold text-[#003527] uppercase tracking-wider">
            Agency Dispatch Volume &amp; Defect Ratio Breakdown
          </span>
          <div className="flex flex-col gap-3.5">
            {agencyStats.map(stat => (
              <div key={stat.name} className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3]">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectAgency(stat.name)}
                      className="font-bold text-[#003527] hover:underline flex items-center gap-1 cursor-pointer"
                      title="Click to view detailed jobs done"
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#fea619]">apartment</span>
                      <span>{stat.name}</span>
                    </button>
                    <span className="text-[#707974] font-medium">({stat.total} Total Jobs)</span>
                  </div>
                  <div className="flex items-center gap-3 font-semibold">
                    <span className="text-emerald-700">{stat.accomplished} Accomplished ({stat.successRate}%)</span>
                    <span className="text-red-700">{stat.failures} Failures ({stat.failRate}%)</span>
                  </div>
                </div>

                {/* The Bar Graph Bar */}
                <div className="w-full h-3.5 rounded-full bg-[#f0ede9] overflow-hidden flex shadow-inner">
                  <div
                    style={{ width: `${stat.successRate}%` }}
                    className="h-full bg-[#003527] transition-all duration-700 relative group cursor-pointer"
                    title={`Accomplished: ${stat.accomplished} (${stat.successRate}%)`}
                  />
                  <div
                    style={{ width: `${stat.failRate}%` }}
                    className="h-full bg-red-600 transition-all duration-700 relative group cursor-pointer"
                    title={`Failures: ${stat.failures} (${stat.failRate}%)`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend Bars */}
        <div className="pt-2 border-t border-[#ebe8e3]">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-[#707974] uppercase tracking-wider">5-Month Quality Progression (Platform-Wide)</span>
            <span className="text-emerald-800 font-bold">Trending Down in Defects (-1.3% since June)</span>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {monthlyTrend.map(m => (
              <div key={m.month} className="p-2.5 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] flex flex-col items-center gap-1">
                <span className="font-bold text-[#1c1c19] text-xs">{m.month} 2024</span>
                <div className="w-full h-16 bg-[#e5e2dd] rounded-lg relative overflow-hidden flex flex-col justify-end">
                  <div style={{ height: `${m.failRate * 12}%` }} className="w-full bg-red-500" title={`Failures: ${m.failRate}%`} />
                  <div style={{ height: `${m.successRate * 0.8}%` }} className="w-full bg-[#003527]" title={`Accomplished: ${m.successRate}%`} />
                </div>
                <div className="text-[10px] text-[#707974] mt-0.5">
                  <strong className="text-emerald-800">{m.successRate}%</strong> / <span className="text-red-700">{m.failRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════
          DISPUTES LIST
      ═════════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#ebe8e3]">
          <h3 className="font-bold text-base text-[#003527] flex items-center gap-2">
            <span className="material-symbols-outlined text-red-600 text-[20px]">gavel</span>
            Client Escalations &amp; Claim Ledgers ({disputes.length})
          </h3>
          <span className="text-xs text-[#707974]">Click any agency to view detailed jobs done and assigned worker</span>
        </div>

        {disputes.length === 0 ? (
          <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl p-16 text-center shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#003527]/10 text-[#003527] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[40px]">gavel</span>
            </div>
            <h3 className="font-bold text-lg text-[#003527]">Zero Open Disputes!</h3>
            <p className="text-sm text-[#707974] mt-1">All agency service warranties are operating at 100% SLA compliance.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {disputes.map(d => {
              const isOldCustomer = d.customerType === 'Old Customer' || d.customerType === 'old';
              return (
                <div key={d.id} className="bg-[#ffffff] border border-[#ebe8e3] rounded-2xl p-5 shadow-xs hover:border-[#003527]/30 transition-all flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-[11px] font-bold font-mono border border-red-200">
                        {d.id}
                      </span>

                      {/* Customer Name + Old vs New Differentiation Badge */}
                      <span className="font-bold text-base text-[#1c1c19]">{d.client}</span>

                      {isOldCustomer ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-[11px] font-bold flex items-center gap-1 shadow-2xs">
                          <span className="material-symbols-outlined text-[13px] text-purple-700">verified_user</span>
                          Returning Customer (Old)
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold flex items-center gap-1 shadow-2xs">
                          <span className="material-symbols-outlined text-[13px] text-amber-700">person_add</span>
                          New Customer (1st Booking)
                        </span>
                      )}

                      <span className="text-[#707974] text-xs">·</span>
                      <span className="text-xs text-[#707974] font-medium">{d.customerDetails || (isOldCustomer ? 'Returning Client' : 'First-time Client')}</span>
                    </div>

                    {/* Clickable Agency Column Button */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#707974]">Agency:</span>
                      <button
                        type="button"
                        onClick={() => onSelectAgency(d.agency)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#fbf7ee] hover:bg-[#003527] hover:text-white border border-[#ebe8e3] text-[#003527] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs group"
                        title="Click to view detailed jobs done and assigned worker"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#fea619]">apartment</span>
                        <span>{d.agency}</span>
                        <span className="text-[10px] text-[#855300] group-hover:text-white font-medium ml-1">
                          (View Jobs Done →)
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Issue & Claim Description */}
                  <div className="p-3.5 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-[#707974] font-semibold">Infestation / SLA Issue: </span>
                      <span className="text-[#1c1c19] font-medium">{d.issue}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#855300] font-bold shrink-0">
                      <span className="material-symbols-outlined text-[16px]">priority_high</span>
                      <span>Claim Demanded: {d.claim}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

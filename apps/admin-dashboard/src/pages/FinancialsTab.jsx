import React, { useState } from 'react';

// ─── Financials Tab ───────────────────────────────────────────────────────────
export default function FinancialsTab({ showToast }) {
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [agenciesList, setAgenciesList] = useState([
    { name: 'EcoPest Solutions', account: 'HDFC •••• 9102', jobs: 184, gmv: '₹2,42,000', fee: '₹36,300', net: '₹2,05,700', status: 'Disbursed', date: '24 Oct 2024, 06:00 PM', utr: 'UTR-HDFC-99120842-EP' },
    { name: 'Apex Pest Bangalore', account: 'ICICI •••• 4421', jobs: 92, gmv: '₹1,18,000', fee: '₹17,700', net: '₹1,00,300', status: 'Pending Approval', date: 'Pending Escrow Release', utr: 'UTR-PENDING-APEX' },
    { name: 'CleanShield NCR', account: 'AXIS •••• 8812', jobs: 64, gmv: '₹84,500', fee: '₹12,675', net: '₹71,825', status: 'Pending Approval', date: 'Pending Escrow Release', utr: 'UTR-PENDING-CS' },
  ]);

  const handlePayNow = (name) => {
    setAgenciesList(prev => prev.map(a => a.name === name ? { ...a, status: 'Disbursed', date: 'Just now (Instant IMPS)', utr: `UTR-RAZORPAYX-${Date.now().toString().slice(-8)}` } : a));
    showToast(`✅ Disbursed payout to ${name} via RazorpayX Escrow API!`);
  };

  const handleDisburseAll = () => {
    setAgenciesList(prev => prev.map(a => ({ ...a, status: 'Disbursed', date: 'Batch Disbursed', utr: `UTR-BATCH-${Date.now().toString().slice(-8)}` })));
    showToast('🚀 All weekly agency payouts disbursed successfully!');
  };

  const totalGMV = agenciesList.reduce((acc, a) => acc + parseInt(a.gmv.replace(/[^0-9]/g, '')), 0);
  const totalFee = agenciesList.reduce((acc, a) => acc + parseInt(a.fee.replace(/[^0-9]/g, '')), 0);
  const totalNet = agenciesList.reduce((acc, a) => acc + parseInt(a.net.replace(/[^0-9]/g, '')), 0);

  const statusStyle = {
    'Disbursed': 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    'Pending Approval': 'bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30',
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#003527]">Settlements, Escrow &amp; GMV Ledger</h2>
          <p className="text-sm text-[#707974] mt-0.5">Automated 15% platform take-rate deduction and weekly IMPS/NEFT agency payouts.</p>
        </div>
        <button
          type="button"
          onClick={handleDisburseAll}
          className="px-5 py-2.5 rounded-xl bg-[#003527] hover:bg-[#064e3b] text-white font-bold text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer w-fit"
        >
          <span className="material-symbols-outlined text-[18px]">payments</span>Disburse Weekly Payouts
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Monthly GMV', value: `₹${(totalGMV).toLocaleString('en-IN')}`, sub: '↑ +18.4% vs last month', icon: 'trending_up', color: 'text-[#003527]' },
          { label: 'Platform Take-Rate (15%)', value: `₹${(totalFee).toLocaleString('en-IN')}`, sub: 'Direct Platform Revenue', icon: 'account_balance', color: 'text-[#855300]' },
          { label: 'Agency Net Settlements', value: `₹${(totalNet).toLocaleString('en-IN')}`, sub: `${agenciesList.filter(a => a.status === 'Disbursed').length} of ${agenciesList.length} Settled`, icon: 'send_money', color: 'text-[#003527]' },
        ].map(k => (
          <div key={k.label} className="bg-[#ffffff] border border-[#ebe8e3] p-5 rounded-3xl shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#003527]/10 flex items-center justify-center text-[#003527]">
                <span className="material-symbols-outlined text-[18px]">{k.icon}</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#707974] font-bold">{k.label}</span>
            </div>
            <div className={`text-3xl font-black ${k.color}`}>{k.value}</div>
            <div className="text-[12px] text-[#003527] font-semibold mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-[#ebe8e3] overflow-hidden shadow-xs bg-[#ffffff]">
        <div className="bg-[#fcf9f4] px-6 py-4 flex items-center justify-between border-b border-[#ebe8e3]">
          <h3 className="font-bold text-[#003527] text-sm">Agency Settlement Breakdown</h3>
          <button
            type="button"
            onClick={() => showToast('📥 Exported settlements_gmv_october.csv')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#003527] text-xs font-bold hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>Export CSV
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-[#707974] font-bold bg-[#fbf7ee] border-b border-[#ebe8e3]">
              <th className="py-3 px-5">Agency</th>
              <th className="py-3 px-4">Jobs</th>
              <th className="py-3 px-4">Gross GMV</th>
              <th className="py-3 px-4">Platform Fee (15%)</th>
              <th className="py-3 px-4">Net Settlement</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ebe8e3] bg-[#ffffff]">
            {agenciesList.map((a) => (
              <tr key={a.name} className="hover:bg-[#fcf9f4] transition-colors text-xs">
                <td className="py-4 px-5">
                  <div className="font-bold text-[#1c1c19] text-sm">{a.name}</div>
                  <div className="text-[11px] text-[#707974] font-mono">{a.account}</div>
                </td>
                <td className="py-4 px-4 text-[#707974] font-medium">{a.jobs}</td>
                <td className="py-4 px-4 font-bold text-[#1c1c19]">{a.gmv}</td>
                <td className="py-4 px-4 text-[#855300] font-semibold">{a.fee}</td>
                <td className="py-4 px-4 font-black text-[#003527]">{a.net}</td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[a.status]}`}>{a.status}</span>
                </td>
                <td className="py-4 px-5 text-right">
                  {a.status === 'Disbursed' ? (
                    <button
                      type="button"
                      onClick={() => setSelectedReceipt(a)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#003527]/10 hover:bg-[#003527] hover:text-white text-[#003527] text-xs font-bold transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">receipt_long</span>Receipt
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePayNow(a.name)}
                      className="px-4 py-1.5 rounded-xl bg-[#003527] hover:bg-[#064e3b] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">send</span>Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReceipt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && setSelectedReceipt(null)}>
          <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#003527] flex items-center justify-center text-white shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#003527] text-base">Payment Settlement Voucher</h3>
                  <p className="text-[12px] text-[#707974] font-mono">{selectedReceipt.utr}</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedReceipt(null)} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3] flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#ebe8e3]/60"><span className="text-[#707974]">Agency:</span><span className="font-bold text-[#1c1c19]">{selectedReceipt.name}</span></div>
              <div className="flex justify-between py-1 border-b border-[#ebe8e3]/60"><span className="text-[#707974]">Account:</span><span className="font-mono text-[#1c1c19] font-bold">{selectedReceipt.account}</span></div>
              <div className="flex justify-between py-1 border-b border-[#ebe8e3]/60"><span className="text-[#707974]">Gross GMV:</span><span className="font-semibold text-[#1c1c19]">{selectedReceipt.gmv} ({selectedReceipt.jobs} Jobs)</span></div>
              <div className="flex justify-between py-1 border-b border-[#ebe8e3]/60"><span className="text-[#707974]">Take-Rate (15%):</span><span className="text-[#855300] font-semibold">- {selectedReceipt.fee}</span></div>
              <div className="flex justify-between py-1 pt-2"><span className="text-[#003527] font-bold">Net Settlement:</span><span className="text-[#003527] font-black text-sm">{selectedReceipt.net}</span></div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => { window.print(); showToast('🖨️ Printing settlement voucher...'); }} className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
                <span className="material-symbols-outlined text-[16px]">print</span>Print Voucher
              </button>
              <button type="button" onClick={() => setSelectedReceipt(null)} className="px-5 py-2.5 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#003527] font-bold text-xs hover:bg-[#f6f3ee] transition-all cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

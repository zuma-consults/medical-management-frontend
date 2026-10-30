function NursingTable() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
      <img src="/empty-list.svg" alt="" className="w-28 mb-4 opacity-70" />
      <h3 className="text-lg font-medium text-ha-primary1 mb-2">
        Nursing module coming soon
      </h3>
      <p className="max-w-md text-sm">
        Nursing orders and task tracking are not connected to the clinic API
        yet. Use Consultation for vitals and clinical notes in the meantime.
      </p>
    </div>
  );
}

export default NursingTable;

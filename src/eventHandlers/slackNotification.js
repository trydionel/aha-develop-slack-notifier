aha.on({ event: 'aha.update.Feature.workflowStatus' }, async (payload, { settings }) => {
  const { record, changes } = payload;
  const feature = await aha.models.Feature.select('name', 'referenceNum').find(record.id);

  await fetch(settings.webhookUrl, {
    method: 'POST',
    body: JSON.stringify({
      text: `Feature ${feature.name} changed from ${changes.workflowStatus.from.name} to ${changes.workflowStatus.to.name}`
    })
  })
});
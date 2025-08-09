const ReplyDraft = ({ draft }) => {
  return (
    <div className="reply-draft">
      <h3>Reply Draft</h3>
      <textarea readOnly value={draft} rows="6"></textarea>
    </div>
  );
};

export default ReplyDraft;
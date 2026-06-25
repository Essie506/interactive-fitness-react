
   <ComposerTools onMediaUpload={setUploadedMedia} />
        <button
          className="btn-post"
          disabled={!postText.trim() && uploadedMedia.length === 0}
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
    </>
  )
}

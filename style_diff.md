diff --git a/style.css b/style.css
index a9a34d0..836062f 100644
--- a/style.css
+++ b/style.css
@@ -1650,7 +1650,7 @@ h4 {
     gap: 1.5rem;
     width: max-content;
     /* Infinite CSS loop animation */
-    animation: marquee 30s linear infinite;
+    animation: marquee 55s linear infinite;
 }
 
 .marquee-track:hover {
@@ -2622,4 +2622,18 @@ footer {
     object-fit: contain;
     background: transparent;
     border: none;
+}
+
+
+
+
+    .fv2-cell-logo-panel {
+        grid-row: 4;
+        grid-column: 1;
+    }
+
+    .fv2-cell-copy {
+        grid-column: 1 !important;
+        /* Override inline CSS */
+    }
 }
\ No newline at end of file

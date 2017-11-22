PROJECT= techReviewFinalDraft
TEX= pdflatex
BIBTEX= bibtex


all:
	$(TEX) $(PROJECT).tex #>/dev/null
	$(BIBTEX) $(PROJECT)  >/dev/null
	$(TEX) $(PROJECT).tex >/dev/null
	$(TEX) $(PROJECT).tex >/dev/null
clean-all:
	rm -f *.dvi *.log *.bak *.aux *.bbl *.blg *.idx *.ps *.eps *.pdf *.toc *.out *~

clean:
	rm -f *.log *.bak *.aux *.bbl *.blg *.idx *.toc *.out *~

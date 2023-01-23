=================
To Deploy
=================
Make sure twine is installed with ``pip install twine``

- ``python setup.py sdist``
- ``twine upload dist/*``

Refer to Package here: https://pypi.org/project/inca-interfaces/

=================
To Use
=================
- ``pip install inca-interfaces``

Example: 
>>> from python import index
>>> index.get_sklearn_version()
'1.2.0'
>>> index.ChunkAnalysis
<class 'python.index.ChunkAnalysis'>
